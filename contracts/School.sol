pragma solidity ^0.8.11;

// SPDX-License-Identifier: MIT

import "./Owner.sol";

contract School is Owner{

  enum Fields { Math, Bio, Info }

  struct Grade {
    uint points;
    Fields field;
  }

  struct Student {
    string name;
    Grade[] grades;
  }

  mapping (address => Student) students;

  constructor() {
    owner = msg.sender;
  }

  function addStudent(address _address, string memory _name) public isOwner {
    require(studentExists(_address) == false , "Student already exists");

    students[_address].name = _name;
  }

  function addGrade(address _address, uint _points, Fields _field) public isOwner{
    require(studentExists(_address) == true, "Student doesn't exist");
    require(_points >= 0, "A grade must be higher or equal to 0");
    require(_points <= 20, "A grade must be at most equal to 20");

    // The enum block the run of the function (without clear warnings...), those lines are useless and never print
    // require(uint(_field) <= 2, "A field must be (lesser or equal to 2) : {Math, Bio, Info}");
    // require(uint(_field) >= 0, "A field must be  positive : {Math, Bio, Info}");
    // require(isValidField(_field) == true, "Not a valid field for mark");

    Grade memory g = Grade(_points, _field);
    students[_address].grades.push(g);
  }

  function getStudentGrades(address _address) view public isOwner returns(Grade[] memory) {
    return students[_address].grades;
  }

  function getGrades() view public returns(Grade[] memory) {
    return students[msg.sender].grades;
  }

  function studentExists(address _address) view private returns(bool) {
    bytes memory nameOfStudent = bytes(students[_address].name);
    return nameOfStudent.length > 0;
  }

  function getStudent(address _address) view public returns(Student memory) {
    return  students[_address];
  }

  // function isValidField(string memory _field) pure private returns(bool) {
  //   string[3] memory validFields = ["Math","Info","Bio"];
  //   uint i;
  //   for(i = 0; i < validFields.length; i += 1){
  //     // keccak256 is cheaper than "StringUtils.equal("","")"
  //     if(keccak256(bytes(validFields[i])) == keccak256(bytes(_field))){
  //       return true;
  //     }
  //   }
  //   return false;
  // }

}
