//DISCLAIMER: THIS IS JUST A "DRAFT" OF SMART CONTRACT NOT AN READY FOR PRODUCTION SCRIPT.

pragma solidity ^0.5.11;

contract MessageWall {

  
    //struct to store private encrypted messages
    struct Message {
        string recipient;
        string sender;
        uint time;
        string message;
    }

    //mapping from message id to Message struct
    mapping(uint => Message) public encryptedMessages;

    //mapping from message id to unencrypted Message string
    mapping(uint => string) public decryptedMessages;
    
    //variable for keeping track of message count
    uint messageCount = 0;
  
  
    //Transfer a private encrypted message
    function transferMessage(string memory _recipient, string memory _sender, uint _time, string memory _message) public 
    {
        //store message
        encryptedMessages[messageCount] = Message(_recipient, _sender, _time, _message);
        
        //increment message count
        messageCount++;
    }
  
    //Function for person A to publish the message after given amount of time
    //personA can call this function to publish the messages
    function publishMessage(uint _id) public 
    {
        //assert that id exists in mapping
        require(encryptedMessages[_id].recipient != "");
        
        //check if the given time has passed
        require(now >= encryptedMessages[_id].time);
        
        //store decrypted message
        decryptedMessages[_id] = encryptedMessages[_id].message;
    }
  
}
