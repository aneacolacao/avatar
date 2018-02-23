<?php

header("Content-Type: text/html;charset=utf-8");

$servername = "localhost";
$username = "migustoe_lanuser";
$password = "s57s2Zwh";
$dbname = "migustoe_landing";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
//echo "Connected successfully";


$name = $_POST['name'];
$email = $_POST['email'];
$id = $_POST['id']; 
//echo $resultado;

if(isset($_POST['id']) && !empty($_POST['id']) ){
 
  $sql = "SELECT * FROM tbl_users WHERE fld_facebook_id = $id";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	    // output data of each row
	    $update_user_query = "update tbl_users set fld_user_name = '$name', fld_user_email='$email' WHERE fld_facebook_id = '$id'";
		if ($conn->query($update_user_query) === TRUE) {
	      echo "Tu usuario ha sido actualizado";
	  	} else {
	      echo "Error: " . $update_user_query . "<br>" . $conn->error;
	  	}	
	} else {
		$time = time();
	    $insert = "INSERT INTO tbl_users (fld_user_name, fld_user_email, fld_facebook_id, fld_user_doj) VALUES ('$name', '$email', '$id', '$time')";

		  if ($conn->query($insert) === TRUE) {
		      echo "New record created successfully";
		  } else {
		      echo "Error: " . $insert . "<br>" . $conn->error;
		  }
	}
  /*$check_user_query = "select * from tbl_users WHERE fld_facebook_id = $id";
  $check_user = $conn->query($check_user_query);
  
  if ($check_user) {
	      echo 'Resultado';
	  } else {
	      echo "Error: " . $check_user_query . "<br>" . $conn->error;
	  }*/
  //if ($conn->query("SELECT * FROM tbl_users WHERE fld_facebook_id = $id") ) {
    //echo "La selección devolvió algo bueno";
//}
  
  	/*$insert = "INSERT INTO tbl_users (fld_user_name, fld_user_email, fld_facebook_id) VALUES ('$name', '$email', '$id')";

	  if ($conn->query($insert) === TRUE) {
	      echo "New record created successfully";
	  } else {
	      echo "Error: " . $insert . "<br>" . $conn->error;
	  }*/	
  
  /*else{

  	$update_user_query = "update tbl_users set fld_user_name = '$name', fld_user_email='$email' WHERE fld_facebook_id = '$id'";
		if ($conn->query($update_user_query) === TRUE) {
	      echo "Tu usuario ha sido actualizado";
	  } else {
	      echo "Error: " . $update_user_query . "<br>" . $conn->error;
	  }	
}*/
 /*
  if(isset($_POST['id']) && !empty($_POST['id']))
{
	include_once 'db.php';
	extract($_POST); // extract post variables

	//check if facebook ID already exits
	$check_user_query = "select * from tbl_users WHERE fld_facebook_id = $id";
	$check_user = $db->getDataFromQuery($check_user_query);
	if(!$check_user)
	{
		//new user - we need to insert a record
		$time = time();
		$insert_user_query = "Insert into tbl_users (`fld_user_name`, `fld_user_email`, `fld_facebook_id`, `fld_user_doj`) VALUES ('$name', '$email', $id, $time)";
		$insert_user = $db->UpdateQuery($insert_user_query);
		echo json_encode($_POST);
	} else {
		//update
		$update_user_query = "update tbl_users set fld_user_name = '$name', fld_user_email='$email' WHERE fld_facebook_id = $id";
		$update_user = $db->UpdateQuery($update_user_query);
		echo json_encode($_POST);
	}
} else {
	$arr = array('error' => 1);
	echo json_encode($arr);
}*/

 
} else {
  $arr = array('error' => 1);
  echo 'La cagaste';
  echo json_encode($arr);

}
mysqli_close($conn);

?>