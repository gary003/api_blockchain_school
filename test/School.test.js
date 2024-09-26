const School = artifacts.require('School')

contract('School', accounts => {
    describe('School > addStudent', async () => {
        it('Should add a new student', async () => {
            const contract = await School.deployed('School', {from : accounts[0]})
            const studentAddress = accounts[2]

            const res = await contract.addStudent(studentAddress, 'Ela Uni', {from : accounts[0]}).catch(_ => null)
            
            assert.isNotNull(res)
            assert.equal(res.receipt.status, true, 'The update is successful (adding new student)')
        })
        it('Should FAIL adding a new student (student already exists)', async () => {
            const contract = await School.deployed('School', {from : accounts[0]})
            const studentAddress = accounts[2]
            const unexpectedSuccessError = 'Error - Unexpected success expected an error'

            try {
                await contract.addStudent(studentAddress, 'Ela Uni', {from : accounts[0]})
                throw new Error(unexpectedSuccessError)
            } catch(err) {
                if( err.message == unexpectedSuccessError) assert.fail(unexpectedSuccessError)                
                // console.log(await getAccounts(), accounts[0])
                assert.equal(err.reason, 'Student already exists')
            }
        })
        it('Should FAIL adding a new student (Only owner can do this)', async () => {
            const contract = await School.deployed('School', {from : accounts[0]})
            const studentAddress = accounts[4]
            const unexpectedSuccessError = 'Error - Unexpected success expected an error'

            try {
                await contract.addStudent(studentAddress, 'Thomas Ilo', {from : accounts[1]})
                throw new Error(unexpectedSuccessError)
            } catch(err) {
                if( err.message == unexpectedSuccessError) assert.fail(unexpectedSuccessError)                
                // console.log(await getAccounts(), accounts[0])
                assert.equal(err.reason, 'You need to be the owner of the contract for that action')
            }
        })
    })
    describe('School > addGrade', async () => {
        it('Should successfully add a grade to a student', async () => {
            const contract = await School.deployed('School', {from : accounts[0]})
            const bioField = School.Fields.Bio
            const studentAddress = accounts[2]

            const res = await contract.addGrade(studentAddress, 12, bioField, {from : accounts[0]}).catch(_ => null)
            // console.log('Gas used:', res.receipt.gasUsed);

            assert.isNotNull(res)
            assert.equal(res.receipt.status, true)
        })
        it('Should fail adding a grade to a student (Only owner can do this)', async () => {
            const contract = await School.deployed('School', {from : accounts[0]})

            const bioField = School.Fields.Bio

            const unexpectedSuccessError = 'Error - Unexpected success expected an error'

            try {
                await contract.addGrade(accounts[5], 12, bioField, {from : accounts[3]})
                throw new Error(unexpectedSuccessError)
            } catch(err) {
                if( err.message == unexpectedSuccessError) assert.fail(unexpectedSuccessError)
                assert.isNotNull(err)
                assert.isNotNull(err.message)
                assert.isTrue(err.message.includes('You need to be the owner of the contract for that action'))
           }
        })
        it('Should fail adding a grade to a student (The student doesn\'t exists)', async () => {
            const contract = await School.deployed('School', {from : accounts[0]})
            const bioField = School.Fields.Bio
            const fake_address = '0x8d9902647a7ab5b283245b2e024c60ec7e38dc22'
            const unexpectedSuccessError = 'Error - Unexpected success expected an error'

            try {
                await contract.addGrade(fake_address, 12, bioField, {from : accounts[0]})
                throw new Error(unexpectedSuccessError)
            } catch(err) {
                if( err.message == unexpectedSuccessError) assert.fail(unexpectedSuccessError)               
                assert.equal(err.reason, 'Student doesn\'t exist')
            }
        })
    })
    describe('School > getStudentGrades', async () => {
        it('Should successfully get a student grades', async () => {
            const contract = await School.deployed('School', {from : accounts[0]})
            const studentAddress = accounts[2]

            const res = await contract.getStudentGrades(studentAddress, {from : accounts[0]}).catch(_ => null)

            assert.isNotNull(res)
            assert.isArray(res)
            assert.isTrue(res.length > 0)
        })
        it('Should fail getting grades of a student (Only owner can do this)', async () => {
            const contract = await School.deployed('School', {from : accounts[0]})
            const studentAddress = accounts[2]
            const unexpectedSuccessError = 'Error - Unexpected success expected an error'

            try {
                await contract.getStudentGrades(studentAddress, {from : accounts[3]})
                throw new Error(unexpectedSuccessError)
            } catch(err) {
                if( err.message == unexpectedSuccessError) assert.fail(unexpectedSuccessError)                
                assert.isNotNull(err)
                assert.isNotNull(err.message)
                assert.isTrue(err.message.includes('You need to be the owner of the contract for that action'))
           }
        })
    })
    describe('School > getStudentGrades', async () => {
        it('Should successfully get a student grades(from contract owner)', async () => {
            const contract = await School.deployed('School', {from : accounts[0]})
            const studentAddress = accounts[2]

            const res = await contract.getStudentGrades(studentAddress, {from : accounts[0]}).catch(_ => null)

            assert.isNotNull(res)
            assert.isArray(res)
            assert.isTrue(res.length > 0)

        })
        it('Should fail getting a student grades (user not the contract owner)', async () => {
            const contract = await School.deployed('School', {from : accounts[0]})
            const studentAddress = accounts[2]
            const unexpectedSuccessError = 'Error - Unexpected success expected an error'

            try {
                await contract.getStudentGrades(studentAddress, {from : accounts[2]})
                throw new Error(unexpectedSuccessError)
            } catch(err) {
                if( err.message == unexpectedSuccessError) assert.fail(unexpectedSuccessError)       
                assert.isNotNull(err)
                assert.isNotNull(err.message)
                assert.isTrue(err.message.includes('You need to be the owner of the contract for that action'))
            }
        })
    })
    describe('School > getGrades', async () => {
        it('Should successfully get a student own grades', async () => {
            const contract = await School.deployed('School', {from : accounts[0]})

            const res = await contract.getGrades({from : accounts[2]}).catch(_ => null)

            assert.isNotNull(res)
            assert.isArray(res)
            assert.isTrue(res.length > 0)
        })
    })
})
