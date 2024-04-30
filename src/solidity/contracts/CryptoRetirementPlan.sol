// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract CryptoRetirementPlan {
    enum PlanType {
        BASIC,
        INHERITANCE,
        FLEXIBLE
    }

    struct Heir {
        address heirAddress;
        string name;
        bool hasWithdrawn;
    }

    struct HeirParameter {
        address heirAddress;
        string name;
    }

    struct Plan {
        PlanType planType;
        uint256 amount;
        uint256 dateAvailableToWithdraw;
        uint256 nextDateOfProofOfLife;
        uint256 commission;
        Heir[] heirs;
        uint32 totalDaysToProofOfLife;
    }

    struct PlanParameter {
        PlanType planType;
        uint256 dateAvailableToWithdraw;
        HeirParameter[] heirs;
        uint32 totalDaysToProofOfLife;
    }

    address contractOwner;
    mapping(address => Plan) public plans;

    uint256 public contractTotalCommissions;

    // This mapping is where the heirs corresponding to each owner
    mapping(address => address[]) public heirsToOwners;

    uint256 public commissionBasicPlan;
    uint256 public commissionInheritancePlan;
    uint256 public commissionFlexiblePlan;
    uint32 public minimumDaysDurationOfPlan;
    uint16 public gracePeriodInDays;

    modifier onlyContractOwner() {
        require(msg.sender == contractOwner, 'You are not the owner');
        _;
    }

    modifier onlyPlanOwner() {
        require(plans[msg.sender].dateAvailableToWithdraw > 0, 'You are not the plan owner');
        _;
    }

    constructor(
        uint256 _commissionBasicPlan,
        uint256 _commissionInheritancePlan,
        uint256 _commissionFlexiblePlan,
        uint32 _minimumDaysDurationOfPlan,
        uint16 _gracePeriodInDays
    ) {
        contractOwner = msg.sender;

        commissionBasicPlan = _commissionBasicPlan;
        commissionInheritancePlan = _commissionInheritancePlan;
        commissionFlexiblePlan = _commissionFlexiblePlan;
        minimumDaysDurationOfPlan = _minimumDaysDurationOfPlan;
        gracePeriodInDays = _gracePeriodInDays;
    }

    function createPlan(PlanParameter memory _plan) external payable {
        require(plans[msg.sender].dateAvailableToWithdraw == 0, 'You cannot create a new plan');
        require(msg.value > 0, 'Amount must be greater than zero');
        require(
            _plan.planType == PlanType.BASIC ||
                _plan.planType == PlanType.INHERITANCE ||
                _plan.planType == PlanType.FLEXIBLE,
            'Invalid plan type'
        );
        require(
            _plan.dateAvailableToWithdraw > block.timestamp + (minimumDaysDurationOfPlan * (1 days)),
            'Invalid withdraw date'
        );
        if (_plan.planType == PlanType.BASIC) {
            require(_plan.heirs.length == 0, 'You cannot create a basic plan with heirs');
            require(_plan.totalDaysToProofOfLife == 0, 'You cannot create a basic plan with proof of life');
        } else if (_plan.planType == PlanType.INHERITANCE || _plan.planType == PlanType.FLEXIBLE) {
            require(_plan.heirs.length > 0, 'You cannot create an inheritance plan without heirs');
        }

        Plan storage newPlan = plans[msg.sender];
        newPlan.planType = _plan.planType;
        newPlan.amount = msg.value;
        newPlan.dateAvailableToWithdraw = _plan.dateAvailableToWithdraw;

        if (_plan.planType == PlanType.FLEXIBLE) {
            newPlan.totalDaysToProofOfLife = _plan.totalDaysToProofOfLife;
            newPlan.nextDateOfProofOfLife = block.timestamp + (_plan.totalDaysToProofOfLife * (1 days));
        }

        if (_plan.planType == PlanType.BASIC) {
            newPlan.commission = commissionBasicPlan;
        } else if (_plan.planType == PlanType.INHERITANCE) {
            newPlan.commission = commissionInheritancePlan;
        } else {
            newPlan.commission = commissionFlexiblePlan;
        }
        for (uint8 i = 0; i < _plan.heirs.length; i++) {
            require(bytes(_plan.heirs[i].name).length > 0, 'Name cannot be empty');
            require(_plan.heirs[i].heirAddress != msg.sender, 'You cannot add to yourself as a heir');
            heirsToOwners[_plan.heirs[i].heirAddress].push(msg.sender);
            newPlan.heirs.push(
                Heir({heirAddress: _plan.heirs[i].heirAddress, name: _plan.heirs[i].name, hasWithdrawn: false})
            );
        }
    }

    function getPlanDetail(address owner) public view returns (Plan memory) {
        return plans[owner];
    }

    function getOwnersFromHeir(address heir) public view returns (address[] memory) {
        return heirsToOwners[heir];
    }

    function addDeposit() external payable onlyPlanOwner {
        require(msg.value > 0, 'Amount must be greater than zero');
        require(plans[msg.sender].dateAvailableToWithdraw > block.timestamp, 'Your plan has expired');
        plans[msg.sender].amount += msg.value;
    }

    function withdrawCapitalOwner() external onlyPlanOwner {
        require(plans[msg.sender].amount > 0, 'You do not have a plan');
        require(
            plans[msg.sender].dateAvailableToWithdraw < block.timestamp,
            'You have to wait until your withdraw date'
        );

        uint256 commission = (plans[msg.sender].amount * plans[msg.sender].commission) / 100;
        uint256 total = plans[msg.sender].amount - commission;

        plans[msg.sender].amount -= plans[msg.sender].amount;
        contractTotalCommissions += commission;

        payable(msg.sender).transfer(total);
    }

    function withdrawCapitalHeir(address owner) external {
        bool isHeir = false;

        for (uint8 i = 0; i < heirsToOwners[msg.sender].length; i++) {
            bytes memory heirsBytes = toBytes(heirsToOwners[msg.sender][i]);
            bytes memory ownerBytes = toBytes(owner);
            if (keccak256(heirsBytes) == keccak256(ownerBytes)) {
                isHeir = true;
                break;
            }
        }
        require(isHeir, 'You are not a heir');
        require(plans[owner].amount > 0, 'You do not have a plan');

        require(plans[owner].dateAvailableToWithdraw < block.timestamp, 'You have to wait until your withdraw date');
        require(
            plans[owner].planType == PlanType.BASIC ||
                (plans[owner].planType != PlanType.BASIC &&
                    plans[owner].dateAvailableToWithdraw + (gracePeriodInDays * (1 days)) < block.timestamp),
            'You have to wait until your grace period'
        );
        require(
            plans[owner].planType == PlanType.INHERITANCE || plans[owner].planType == PlanType.FLEXIBLE,
            'You cannot withdraw from this plan'
        );

        uint256 availableHeirs = plans[owner].heirs.length;
        for (uint8 i = 0; i < plans[owner].heirs.length; i++) {
            if (plans[owner].heirs[i].hasWithdrawn) {
                availableHeirs -= 1;
            }
        }

        for (uint8 i = 0; i < plans[owner].heirs.length; i++) {
            if (plans[owner].heirs[i].heirAddress == msg.sender) {
                if (plans[owner].heirs[i].hasWithdrawn) {
                    revert('You have already withdrawn');
                } else {
                    plans[owner].heirs[i].hasWithdrawn = true;
                    break;
                }
            }
        }

        uint256 temporalTotal = plans[owner].amount / availableHeirs;
        uint256 commission = (temporalTotal * plans[owner].commission) / 100;
        uint256 total = temporalTotal - commission;

        plans[owner].amount -= temporalTotal;
        contractTotalCommissions += commission;

        payable(msg.sender).transfer(total);
    }

    function getCommission(PlanType planType) external view returns (uint256) {
        if (planType == PlanType.BASIC) {
            return commissionBasicPlan;
        } else if (planType == PlanType.INHERITANCE) {
            return commissionInheritancePlan;
        } else {
            return commissionFlexiblePlan;
        }
    }

    function addHeirs(HeirParameter[] memory heir) external onlyPlanOwner {
        require(plans[msg.sender].amount > 0, 'You do not have a plan');
        require(
            plans[msg.sender].planType == PlanType.INHERITANCE || plans[msg.sender].planType == PlanType.FLEXIBLE,
            'You cannot add heirs to this plan'
        );
        require(plans[msg.sender].dateAvailableToWithdraw > block.timestamp, 'Your plan has expired');

        for (uint8 i = 0; i < heir.length; i++) {
            require(bytes(heir[i].name).length > 0, 'Name cannot be empty');
            require(heir[i].heirAddress != msg.sender, 'You cannot add to yourself as a heir');
            plans[msg.sender].heirs.push(
                Heir({heirAddress: heir[i].heirAddress, name: heir[i].name, hasWithdrawn: false})
            );
            heirsToOwners[heir[i].heirAddress].push(msg.sender);
        }
    }

    function removeHeir(address heirAddress) external onlyPlanOwner {
        require(plans[msg.sender].amount > 0, 'You do not have a plan');
        require(
            plans[msg.sender].planType == PlanType.INHERITANCE || plans[msg.sender].planType == PlanType.FLEXIBLE,
            'You cannot remove heirs to this plan'
        );
        require(plans[msg.sender].dateAvailableToWithdraw > block.timestamp, 'Your plan has expired');

        for (uint8 i = 0; i < plans[msg.sender].heirs.length; i++) {
            if (plans[msg.sender].heirs[i].heirAddress == heirAddress) {
                plans[msg.sender].heirs[i] = plans[msg.sender].heirs[plans[msg.sender].heirs.length - 1];
                plans[msg.sender].heirs.pop();
                break;
            }
        }

        heirsToOwners[heirAddress] = new address[](0);
    }

    function giveProofOfLife() external onlyPlanOwner {
        require(plans[msg.sender].amount > 0, 'You do not have a plan');
        require(
            plans[msg.sender].dateAvailableToWithdraw < block.timestamp,
            'You have to wait until your withdraw date'
        );
        require(plans[msg.sender].planType == PlanType.FLEXIBLE, 'Your plan does not have proof of life');
        require(
            plans[msg.sender].nextDateOfProofOfLife < block.timestamp,
            'You have to wait until your proof of life date'
        );
        plans[msg.sender].nextDateOfProofOfLife = block.timestamp + plans[msg.sender].totalDaysToProofOfLife * (1 days);
    }

    function updateCommissions(
        uint256 _basicCommission,
        uint256 _inheritanceCommission,
        uint256 _flexibleComission
    ) public onlyContractOwner {
        require(_basicCommission >= 0 && _basicCommission <= 10, 'Invalid commission');
        require(_inheritanceCommission >= 0 && _inheritanceCommission <= 10, 'Invalid commission');
        require(_flexibleComission >= 0 && _flexibleComission <= 10, 'Invalid commission');
        commissionBasicPlan = _basicCommission;
        commissionInheritancePlan = _inheritanceCommission;
        commissionFlexiblePlan = _flexibleComission;
    }

    function setMinimumDaysDurationOfPlan(uint32 _minimumDaysDurationOfPlan) public onlyContractOwner {
        require(_minimumDaysDurationOfPlan > 0, 'Miminum days to withdraw must be greater than zero');
        minimumDaysDurationOfPlan = _minimumDaysDurationOfPlan;
    }

    function toBytes(address a) public pure returns (bytes memory) {
        return abi.encodePacked(a);
    }

    function setGracePeriodInDays(uint16 _gracePeriodInDays) external onlyContractOwner {
        require(_gracePeriodInDays > 90 && _gracePeriodInDays < 720, 'Invalid grace period');
        gracePeriodInDays = _gracePeriodInDays;
    }

    function withdrawCapitalContractOwner() external onlyContractOwner {
        require(contractTotalCommissions > 0, 'There are not founds to transfer');
        payable(contractOwner).transfer(contractTotalCommissions);
    }
}
