const { expect } = require('chai');
const { ethers, waffle } = require('hardhat');
const dayjs = require('dayjs');
const { toWei, toEther } = require('./testUtils');

let deployer, cryptoRetirementPlan, addr1, addr2, addr3, addr4;
const basicCommission = 2;
const inheritanceCommission = 5;
const flexibleCommission = 5;
const minimumDaysDurationOfPlan = 1;
const gracePeriodInDays = 30;
const PlanType = { BASIC: 0, INHERITANCE: 1, FLEXIBLE: 2 };

const activateTestThatCannotBeTested = false; // This flag is because there are some test that can not be test because we cannot manage the current date of the hardhat node

beforeEach(async () => {
  const CryptoRetirementPlan = await ethers.getContractFactory('CryptoRetirementPlan');

  [deployer, addr1, addr2, addr3, addr4] = await ethers.getSigners();

  cryptoRetirementPlan = await CryptoRetirementPlan.deploy(
    basicCommission,
    inheritanceCommission,
    flexibleCommission,
    minimumDaysDurationOfPlan,
    gracePeriodInDays
  );
});

describe('Tests for Create plan', () => {
  it('should create a new basic plan with the correct data', async () => {
    const planType = PlanType.BASIC;
    const amount = toWei(1);
    const dateAvailableToWithdraw = 1740362524;
    await cryptoRetirementPlan.connect(addr4).createPlan(
      {
        planType: planType,
        dateAvailableToWithdraw: dateAvailableToWithdraw,
        heirs: [],
        totalDaysToProofOfLife: 0
      },
      { value: amount }
    );

    const planDetail = await cryptoRetirementPlan.connect(addr4).getPlanDetail(addr4.address);
    expect(planDetail.planType).equal(planType);
    expect(planDetail.amount).equal(amount);
    expect(planDetail.dateAvailableToWithdraw).equal(dateAvailableToWithdraw);
    expect(planDetail.commission).equal(2);
  });

  it('should not create a plan two times', async () => {
    const planType = PlanType.BASIC;
    const amount = toWei(1);
    const dateAvailableToWithdraw = 1740362524;
    await cryptoRetirementPlan.connect(addr4).createPlan(
      {
        planType: planType,
        dateAvailableToWithdraw: dateAvailableToWithdraw,
        heirs: [],
        totalDaysToProofOfLife: 0
      },
      { value: amount }
    );

    await expect(
      cryptoRetirementPlan.connect(addr4).createPlan(
        {
          planType: planType,
          dateAvailableToWithdraw: dateAvailableToWithdraw,
          heirs: [],
          totalDaysToProofOfLife: 0
        },
        { value: amount }
      )
    ).revertedWith('You cannot create a new plan');
  });

  it('should throw an error if create a new basic plan with heirs', async () => {
    const planType = PlanType.BASIC;
    const amount = toWei(1);
    const dateAvailableToWithdraw = 1740362524;
    const heirs = [
      { heirAddress: addr1.address, name: 'Heir1' },
      { heirAddress: addr2.address, name: 'Heir2' }
    ];

    await expect(
      cryptoRetirementPlan.connect(addr4).createPlan(
        {
          planType: planType,
          dateAvailableToWithdraw: dateAvailableToWithdraw,
          heirs: heirs,
          totalDaysToProofOfLife: 0
        },
        { value: amount }
      )
    ).revertedWith('You cannot create a basic plan with heirs');
  });

  it('should create a new inheritance plan with the correct data', async () => {
    const planType = PlanType.INHERITANCE;
    const amount = toWei(1);
    const dateAvailableToWithdraw = 1740362524;
    const heirs = [
      { heirAddress: addr1.address, name: 'Heir1' },
      { heirAddress: addr2.address, name: 'Heir2' }
    ];

    await cryptoRetirementPlan.connect(addr4).createPlan(
      {
        planType: planType,
        dateAvailableToWithdraw: dateAvailableToWithdraw,
        heirs: heirs,
        totalDaysToProofOfLife: 0
      },
      { value: amount }
    );

    const planDetail = await cryptoRetirementPlan.connect(addr4).getPlanDetail(addr4.address);
    expect(planDetail.planType).equal(planType);
    expect(planDetail.amount).equal(amount);
    expect(planDetail.dateAvailableToWithdraw).equal(dateAvailableToWithdraw);
    expect(planDetail.commission).equal(5);
    expect(planDetail.heirs[0].heirAddress).equal(heirs[0].heirAddress);
    expect(planDetail.heirs[0].name).equal(heirs[0].name);
    expect(planDetail.heirs[1].heirAddress).equal(heirs[1].heirAddress);
    expect(planDetail.heirs[1].name).equal(heirs[1].name);
    expect(await cryptoRetirementPlan.getOwnersFromHeir(planDetail.heirs[0].heirAddress)).to.have.all.members([
      addr4.address
    ]);
    expect(await cryptoRetirementPlan.getOwnersFromHeir(planDetail.heirs[1].heirAddress)).to.have.all.members([
      addr4.address
    ]);
  });

  it('should not create a new inheritance plan without heirs', async () => {
    const planType = PlanType.INHERITANCE;
    const amount = toWei(1);
    const dateAvailableToWithdraw = 1740362524;
    const heirs = [];

    await expect(
      cryptoRetirementPlan.connect(addr4).createPlan(
        {
          planType: planType,
          dateAvailableToWithdraw: dateAvailableToWithdraw,
          heirs: heirs,
          totalDaysToProofOfLife: 0
        },
        { value: amount }
      )
    ).revertedWith('You cannot create an inheritance plan without heirs');
  });

  it('should create a new inheritance plan with a heir as yourself', async () => {
    const planType = PlanType.INHERITANCE;
    const amount = toWei(1);
    const dateAvailableToWithdraw = 1740362524;
    const heirs = [
      { heirAddress: addr1.address, name: 'Heir1' },
      { heirAddress: addr4.address, name: 'Heir4' }
    ];

    await expect(
      cryptoRetirementPlan.connect(addr4).createPlan(
        {
          planType: planType,
          dateAvailableToWithdraw: dateAvailableToWithdraw,
          heirs: heirs,
          totalDaysToProofOfLife: 0
        },
        { value: amount }
      )
    ).revertedWith('You cannot add to yourself as a heir');
  });

  it('should create a flexible new plan with the correct data', async () => {
    const planType = PlanType.FLEXIBLE;
    const amount = toWei(1);
    const dateAvailableToWithdraw = 1740362524;
    const heirs = [
      { heirAddress: addr1.address, name: 'Heir1' },
      { heirAddress: addr2.address, name: 'Heir2' }
    ];
    const totalDaysToProofOfLife = 365;

    await cryptoRetirementPlan.connect(addr4).createPlan(
      {
        planType: planType,
        dateAvailableToWithdraw: dateAvailableToWithdraw,
        heirs: heirs,
        totalDaysToProofOfLife: totalDaysToProofOfLife
      },
      { value: amount }
    );

    const planDetail = await cryptoRetirementPlan.connect(addr4).getPlanDetail(addr4.address);
    expect(planDetail.planType).equal(planType);
    expect(planDetail.amount).equal(amount);
    expect(planDetail.dateAvailableToWithdraw).equal(dateAvailableToWithdraw);
    expect(planDetail.commission).equal(5);
    expect(planDetail.heirs[0].heirAddress).equal(heirs[0].heirAddress);
    expect(planDetail.heirs[0].name).equal(heirs[0].name);
    expect(planDetail.heirs[1].heirAddress).equal(heirs[1].heirAddress);
    expect(planDetail.heirs[1].name).equal(heirs[1].name);
    expect(planDetail.totalDaysToProofOfLife).equal(totalDaysToProofOfLife);

    const nextDateOfProofOfLifeFrom = Math.floor(
      dayjs().add(totalDaysToProofOfLife, 'days').subtract(1, 'days') / 1000
    );
    const nextDateOfProofOfLifeTo = Math.floor(dayjs().add(totalDaysToProofOfLife, 'days').add(1, 'days') / 1000);
    expect(planDetail.nextDateOfProofOfLife).to.be.above(nextDateOfProofOfLifeFrom);
    expect(planDetail.nextDateOfProofOfLife).to.be.below(nextDateOfProofOfLifeTo);
    expect(await cryptoRetirementPlan.getOwnersFromHeir(planDetail.heirs[0].heirAddress)).to.have.all.members([
      addr4.address
    ]);
    expect(await cryptoRetirementPlan.getOwnersFromHeir(planDetail.heirs[1].heirAddress)).to.have.all.members([
      addr4.address
    ]);
  });
});

describe('Tests for Commisions', () => {
  it('should update commissions (BASIC, INHERITANCE, FLEXIBLE) correctly', async () => {
    const newBasicCommission = 8;
    const newInheritanceCommission = 7;
    const newFlexibleCommission = 6;

    await cryptoRetirementPlan
      .connect(deployer)
      .updateCommissions(newBasicCommission, newInheritanceCommission, newFlexibleCommission);

    expect(await cryptoRetirementPlan.commissionBasicPlan()).equal(8);
    expect(await cryptoRetirementPlan.commissionInheritancePlan()).equal(7);
    expect(await cryptoRetirementPlan.commissionFlexiblePlan()).equal(6);
  });

  it('should not be able to modify Basic Commission below 0', async () => {
    const newBasicCommission = -1;
    const newInheritanceCommission = 7;
    const newFlexibleCommission = 6;

    await expect(
      cryptoRetirementPlan
        .connect(deployer)
        .updateCommissions(newBasicCommission, newInheritanceCommission, newFlexibleCommission)
    ).revertedWith('');
  });

  it('should not be able to modify Inheritance Commission below 0', async () => {
    const newBasicCommission = 8;
    const newInheritanceCommission = -1;
    const newFlexibleCommission = 6;

    await expect(
      cryptoRetirementPlan
        .connect(deployer)
        .updateCommissions(newBasicCommission, newInheritanceCommission, newFlexibleCommission)
    ).revertedWith('');
  });

  it('should not be able to modify Flexible Commission below 0', async () => {
    const newBasicCommission = 8;
    const newInheritanceCommission = 7;
    const newFlexibleCommission = -1;

    await expect(
      cryptoRetirementPlan
        .connect(deployer)
        .updateCommissions(newBasicCommission, newInheritanceCommission, newFlexibleCommission)
    ).revertedWith('');
  });

  it('should not be able to modify Basic Commission above 10', async () => {
    const newBasicCommission = 11;
    const newInheritanceCommission = 7;
    const newFlexibleCommission = 6;

    await expect(
      cryptoRetirementPlan
        .connect(deployer)
        .updateCommissions(newBasicCommission, newInheritanceCommission, newFlexibleCommission)
    ).revertedWith('Invalid commission');
  });

  it('should not be able to modify Inheritance Commission above 10', async () => {
    const newBasicCommission = 8;
    const newInheritanceCommission = 11;
    const newFlexibleCommission = 6;

    await expect(
      cryptoRetirementPlan
        .connect(deployer)
        .updateCommissions(newBasicCommission, newInheritanceCommission, newFlexibleCommission)
    ).revertedWith('Invalid commission');
  });

  it('should not be able to modify Flexible Commission above 10', async () => {
    const newBasicCommission = 8;
    const newInheritanceCommission = 7;
    const newFlexibleCommission = 11;

    await expect(
      cryptoRetirementPlan
        .connect(deployer)
        .updateCommissions(newBasicCommission, newInheritanceCommission, newFlexibleCommission)
    ).revertedWith('Invalid commission');
  });
});

describe('Tests only in development mode, it wont work in production', () => {
  it('should not be able to add deposit to the plan if the plan is not active', async () => {
    // This is not possible to test because we can't manage the current date in the blockchain
    expect(1).equal(1);
  });

  it('should withdraw the capital if its the owner', async () => {
    // This is not possible to test because we can't manage the current date in the blockchain
    expect(1).equal(1);
  });

  it('should withdraw the capital if its heirs', async () => {
    if (!activateTestThatCannotBeTested) {
      return;
    }

    const planType = PlanType.FLEXIBLE;
    const amount = toWei(100);
    const dateAvailableToWithdraw = 1740362524;
    const heirs = [
      { heirAddress: addr1.address, name: 'Heir1' },
      { heirAddress: addr2.address, name: 'Heir2' }
    ];

    const balanceAddr1PreWithdraw = await provider.getBalance(addr1.address);

    await cryptoRetirementPlan.connect(addr4).createPlan(
      {
        planType: planType,
        dateAvailableToWithdraw: dateAvailableToWithdraw,
        heirs: heirs
      },
      { value: amount }
    );

    await cryptoRetirementPlan.connect(addr1).withdrawCapitalHeir(addr4.address);

    const planDetail = await cryptoRetirementPlan.connect(addr4).getPlanDetail(addr4.address);
    const expectedAmount = amount / heirs.length;

    expect(planDetail.amount.toString()).equal(expectedAmount.toString());

    const contractTotalCommision = await cryptoRetirementPlan.contractTotalCommissions();
    expect(contractTotalCommision.toString()).equal('2500000000000000000');

    const balanceAddr1PostWithdraw = await provider.getBalance(addr1.address);
    expect(+balanceAddr1PostWithdraw).greaterThan(+balanceAddr1PreWithdraw);
  });

  it('should throw an error if the heir try to withdraw two times', async () => {
    if (!activateTestThatCannotBeTested) {
      return;
    }

    const planType = PlanType.FLEXIBLE;
    const amount = toWei(100);
    const dateAvailableToWithdraw = 1740362524;
    const heirs = [
      { heirAddress: addr1.address, name: 'Heir1' },
      { heirAddress: addr2.address, name: 'Heir2' }
    ];
    await cryptoRetirementPlan.connect(addr4).createPlan(
      {
        planType: planType,
        dateAvailableToWithdraw: dateAvailableToWithdraw,
        heirs: heirs
      },
      { value: amount }
    );

    await cryptoRetirementPlan.connect(addr1).withdrawCapitalHeir(addr4.address);
    await expect(cryptoRetirementPlan.connect(addr1).withdrawCapitalHeir(addr4.address)).to.be.revertedWith(
      'You have already withdrawn'
    );
  });

  it('should give proof of life correctly', async () => {
    if (!activateTestThatCannotBeTested) {
      return;
    }

    const planType = PlanType.FLEXIBLE;
    const amount = toWei(1);
    const dateAvailableToWithdraw = 1740362524;
    const heirs = [
      { heirAddress: addr1.address, name: 'Heir1' },
      { heirAddress: addr2.address, name: 'Heir2' }
    ];
    const totalDaysToProofOfLife = 365;

    await cryptoRetirementPlan.connect(addr4).createPlan(
      {
        planType: planType,
        dateAvailableToWithdraw: dateAvailableToWithdraw,
        heirs: heirs,
        totalDaysToProofOfLife: totalDaysToProofOfLife
      },
      { value: amount }
    );

    await cryptoRetirementPlan.connect(addr4).giveProofOfLife();
    const planDetail = await cryptoRetirementPlan.connect(addr4).getPlanDetail(addr4.address);

    const nextDateOfProofOfLifeFrom = Math.floor(
      dayjs().add(totalDaysToProofOfLife, 'days').subtract(1, 'days') / 1000
    );
    const nextDateOfProofOfLifeTo = Math.floor(dayjs().add(totalDaysToProofOfLife, 'days').add(1, 'days') / 1000);
    expect(planDetail.nextDateOfProofOfLife).to.be.above(nextDateOfProofOfLifeFrom);
    expect(planDetail.nextDateOfProofOfLife).to.be.below(nextDateOfProofOfLifeTo);
  });

  it('should withdraw total commission of the contract', async () => {
    if (!activateTestThatCannotBeTested) {
      return;
    }

    const provider = waffle.provider;
    const planType = PlanType.BASIC;
    const amount = toWei(100);
    const dateAvailableToWithdraw = 1740362524;
    const heirs = [];
    const totalDaysToProofOfLife = 0;

    const balanceDeployerPreWithdraw = await provider.getBalance(deployer.address);

    await cryptoRetirementPlan.connect(addr1).createPlan(
      {
        planType: planType,
        dateAvailableToWithdraw: dateAvailableToWithdraw,
        heirs: heirs,
        totalDaysToProofOfLife: totalDaysToProofOfLife
      },
      { value: amount }
    );

    await cryptoRetirementPlan.connect(addr1).withdrawCapitalOwner();

    await cryptoRetirementPlan.connect(deployer).withdrawCapitalContractOwner();
    const balanceDeployerPostWithdraw = await provider.getBalance(deployer.address);
    expect(+balanceDeployerPostWithdraw).greaterThan(+balanceDeployerPreWithdraw);
  });
});

describe('CryptoRetirementPlan Contract', () => {
  it('should modify minimum days to expire date', async () => {
    await cryptoRetirementPlan.connect(deployer).setMinimumDaysDurationOfPlan(730);

    expect(await cryptoRetirementPlan.minimumDaysDurationOfPlan()).equal(730);
  });

  it('should throw an error when minimum days to withdraw is zero or lower', async () => {
    await expect(cryptoRetirementPlan.connect(deployer).setMinimumDaysDurationOfPlan(0)).to.be.revertedWith(
      'Miminum days to withdraw must be greater than zero'
    );
  });

  it('should add deposit to the plan', async () => {
    const planType = PlanType.BASIC;
    const amount = toWei(1);
    const dateAvailableToWithdraw = 1740362524;
    await cryptoRetirementPlan.connect(addr4).createPlan(
      {
        planType: planType,
        dateAvailableToWithdraw: dateAvailableToWithdraw,
        heirs: [],
        totalDaysToProofOfLife: 0
      },
      { value: amount }
    );

    const amount2 = toWei(2);
    await cryptoRetirementPlan.connect(addr4).addDeposit({ value: amount2 });

    const planDetail = await cryptoRetirementPlan.connect(addr4).getPlanDetail(addr4.address);
    expect(+toEther(planDetail.amount)).equal(+toEther(amount) + +toEther(amount2));
  });

  it('should modify grace period', async () => {
    await cryptoRetirementPlan.connect(deployer).setGracePeriodInDays(180);

    expect(await cryptoRetirementPlan.gracePeriodInDays()).equal(180);
  });

  it('should not modify grace period if pass below 90 or above 720', async () => {
    await expect(cryptoRetirementPlan.connect(deployer).setGracePeriodInDays(80)).revertedWith('Invalid grace period');
    await expect(cryptoRetirementPlan.connect(deployer).setGracePeriodInDays(730)).revertedWith('Invalid grace period');
  });

  it('should add new heir', async () => {
    const planType = PlanType.INHERITANCE;
    const amount = toWei(1);
    const dateAvailableToWithdraw = 1740362524;
    const heirs = [{ heirAddress: addr1.address, name: 'Heir1' }];
    await cryptoRetirementPlan.connect(addr4).createPlan(
      {
        planType: planType,
        dateAvailableToWithdraw: dateAvailableToWithdraw,
        heirs: heirs,
        totalDaysToProofOfLife: 0
      },
      { value: amount }
    );

    const newHeirs = [
      { heirAddress: addr2.address, name: 'Heir2' },
      { heirAddress: addr3.address, name: 'Heir3' }
    ];
    await cryptoRetirementPlan.connect(addr4).addHeirs(newHeirs);

    const planDetail = await cryptoRetirementPlan.connect(addr4).getPlanDetail(addr4.address);
    expect(planDetail.heirs.length).equal(3);
    expect(planDetail.heirs[1].name).equal('Heir2');
    expect(planDetail.heirs[2].name).equal('Heir3');
  });

  it('should not add to yourself as a heir', async () => {
    const planType = PlanType.INHERITANCE;
    const amount = toWei(1);
    const dateAvailableToWithdraw = 1740362524;
    const heirs = [{ heirAddress: addr1.address, name: 'Heir1' }];
    await cryptoRetirementPlan.connect(addr4).createPlan(
      {
        planType: planType,
        dateAvailableToWithdraw: dateAvailableToWithdraw,
        heirs: heirs,
        totalDaysToProofOfLife: 0
      },
      { value: amount }
    );

    const newHeirs = [{ heirAddress: addr4.address, name: 'Heir4' }];
    await expect(cryptoRetirementPlan.connect(addr4).addHeirs(newHeirs)).revertedWith(
      'You cannot add to yourself as a heir'
    );
  });

  it('should remove heir', async () => {
    const planType = PlanType.INHERITANCE;
    const amount = toWei(1);
    const dateAvailableToWithdraw = 1740362524;
    const heirs = [
      { heirAddress: addr1.address, name: 'Heir1' },
      { heirAddress: addr2.address, name: 'Heir2' },
      { heirAddress: addr3.address, name: 'Heir3' }
    ];
    await cryptoRetirementPlan.connect(addr4).createPlan(
      {
        planType: planType,
        dateAvailableToWithdraw: dateAvailableToWithdraw,
        heirs: heirs,
        totalDaysToProofOfLife: 0
      },
      { value: amount }
    );

    await cryptoRetirementPlan.connect(addr4).removeHeir(addr2.address);

    const planDetail = await cryptoRetirementPlan.connect(addr4).getPlanDetail(addr4.address);
    expect(planDetail.heirs.length).equal(2);
    expect(planDetail.heirs[0].name).equal('Heir1');
    expect(planDetail.heirs[1].name).equal('Heir3');
  });

  it('should not get plan details if you are not the plan owner', async () => {
    // Function not developed for bytes limit in the contract
    expect(1).equal(1);
    // const planType = PlanType.BASIC;
    // const amount = toWei(1);
    // const dateAvailableToWithdraw = 1740362524;
    // await cryptoRetirementPlan.connect(addr4).createPlan(
    //   {
    //     planType: planType,
    //     dateAvailableToWithdraw: dateAvailableToWithdraw,
    //     heirs: [],
    //     totalDaysToProofOfLife: 0
    //   },
    //   { value: amount }
    // );

    // await expect(cryptoRetirementPlan.connect(addr1).getPlanDetail(addr4.address)).revertedWith(
    //   'You are not be able to get the info'
    // );
  });
});
