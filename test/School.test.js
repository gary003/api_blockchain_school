const School = artifacts.require('School')

contract('School', accounts => {
    describe('School > addStudent', async () => {
        it('Should add a new student', async () => {
            const contract = await School.deployed('School')

            const addResult = await contract.addStudent('0x8d9902647a7ab5b283245b2e024c60ec7e38dc28', 'Ela Uni', {from : accounts[0]})
            
            assert.equal(addResult.receipt.status, true, 'The update is successful (adding new student)')
        })
        it('Should FAIL adding a new student (student already exists)', async () => {
            const contract = await School.deployed('School')

            try {
                await contract.addStudent('0x8d9902647a7ab5b283245b2e024c60ec7e38dc28', 'Ela Uni', {from : accounts[0]})
                assert.fail('Unexpected success for adding new student')
            } catch(err) {
                // console.log(await web3.eth.getAccounts(), accounts[0])
                assert.equal(err.reason, 'Student already exists')
            }
        })
    })
    describe('School > addGrade', async () => {
        it('Should successfully add a grade to a student', async () => {
            const contract = await School.deployed('School')
            const bioField = School.Fields.Bio

            const res = await contract.addGrade('0x8d9902647a7ab5b283245b2e024c60ec7e38dc28', 12, bioField)

            assert.equal(res.receipt.status, true)
        })
        it('Should fail adding a grade to a student (The student doesn\'t vexists', async () => {
            const contract = await School.deployed('School')

            const bioField = School.Fields.Bio
            const fake_address = '0x8d9902647a7ab5b283245b2e024c60ec7e38dc22'

            try {
                await contract.addGrade(fake_address, 12, bioField)
                assert.fail('Error - Unexpected success while adding a grade')
            } catch(error) {
                assert.equal(error.reason, 'Student doesn\'t exist')
            }
        })

    })
})
