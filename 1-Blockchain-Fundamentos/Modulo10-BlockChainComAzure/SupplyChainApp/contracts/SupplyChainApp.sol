pragma solidity ^0.4.25;

contract SupplyChainApp
{
    struct Location{
        string Name;
        uint LocationId;
        uint PreviousLocationId;
        uint Timestamp;
        string Secret;
    }
    
    mapping(uint => Location) Trail;
    uint8 TrailCount=0;

    function GetTrailCount() public returns(uint8){
        return TrailCount;
    }

    function AddNewLocation(uint LocationId, string memory Name, string memory Secret) public
    {
        Location memory newLocation;
        newLocation.Name = Name;
        newLocation.LocationId = LocationId;
        newLocation.Secret = Secret;
        newLocation.Timestamp = now;
        if(TrailCount!=0)
        {
            newLocation.PreviousLocationId = Trail[TrailCount].LocationId;
        }
        Trail[TrailCount] = newLocation;
        TrailCount++;
    }


    function GetLocation(uint8 TrailNo) public returns (string memory,uint,uint,uint,string memory)
    {
        return (Trail[TrailNo].Name, Trail[TrailNo].LocationId, Trail[TrailNo].PreviousLocationId, Trail[TrailNo].Timestamp,Trail[TrailNo].Secret);
    }
}
