// SPDX-License-Identifier: MIT

pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract teacher{
	address owner;

	constructor () public {
        owner = msg.sender;
	}

	modifier onlyOwner{
	  require(msg.sender == owner);
	  _;
	}

	struct student{
	  string fname;
	  string lname;
	  uint ID;
	  uint attendanceCount;
	  bool set;
	}
	
	string Subject;
	string Date;
	string Time;

	mapping (uint=> student) studentlist;

	uint [] private totalstudents;

	function addstudent(uint _studid, string memory _fname, string memory _lname ) onlyOwner public payable{
	   student storage stu = studentlist[_studid];
	   require(!stu.set);
	  
	   
	   require(_studid!=0);
	   
	   stu.fname = _fname;
	   stu.lname = _lname;
	   stu.ID = _studid;
	   stu.attendanceCount = 0;
	   stu.set= true;
	   totalstudents.push(_studid);
	   } 
	   
	 function AddSubTime(string memory _sub, string memory _time, string memory _date) onlyOwner public payable{
	     Subject=_sub;
	     Date=_date;
	     Time=_time;
	     
	     
	 }
	
	function getOneStudent(uint _studid) public view returns(string memory, string memory, uint){
	    require(_studid!=0);
	    require(studentlist[_studid].set==true);
	   return (studentlist[_studid].fname,
	           studentlist[_studid].lname,
	           studentlist[_studid].attendanceCount);
    }

    function incrementAttendance(uint _studid) public onlyOwner payable{
       student storage stu = studentlist[_studid];
       require(stu.set);
       require(_studid!=0);
       studentlist[_studid].attendanceCount +=1;
    }

    function getAllStudent() public view returns(uint[] memory){
       return totalstudents;
    }

    function countStudent() public view returns(uint){
      return totalstudents.length;
    }
    
    function GetSubTime() public view returns(string memory, string memory, string memory){
        return(Subject,Date,Time);
    }

    function teachername() public view returns(address){
    return owner;
    }
    
}