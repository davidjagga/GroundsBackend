const express = require('express');
const router = express.Router();
const { PrismaClient, Approval } = require('@prisma/client');

const prisma = new PrismaClient();

//------------------------------------------------------------------------------------------
//            Create Ride
//------------------------------------------------------------------------------------------
async function makeRide(rideData) {
  try {
    // Create ride in the database
    const ride = await prisma.ride.create({
      data: rideData,
    });

    return ride;
  } catch (error) {
    throw new Error(`Error creating ride: ${error.message}`);
  }
}

//route
router.post('/createRide', async (req, res) => {
  try {
    // Get rideData from req.body
    const rideData = req.body;

    const ride = await makeRide(rideData);
    res.json(ride);
  } catch (error) {
    res.status(500).json({ error: `Error creating ride data: ${error.message}` });
  }
});

//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
//            Delete Ride (by ID)
//------------------------------------------------------------------------------------------
async function deleteRidebyID(rideID) {
  try {
    const deletedRide = await prisma.ride.delete({
      where: {
        id: rideID,
      },
    });
    return deletedRide;
  } catch (error) {
    throw new Error(`Error deleting ride with ID ${rideID}: ${error.message}`);
  }
}

//route
router.post('/deleteRide', async (req, res) => {
  try {
    const { rideID } = req.body;

    const delRide = await deleteRidebyID(rideID);
    res.json(delRide);
  } catch (error) {
    res.status(500).json({ error: `Error deleting ride: ${error.message}` });
  }
});
//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
//            Get Ride by id
//------------------------------------------------------------------------------------------
async function getRide(rideId) {
  try {
    const ride = await prisma.ride.findUnique({
      where: {
        id: rideId,
      },
      include: {
        rideRequests: true,
      }
    });

    return ride;
  } catch (error) {
    throw new Error(`Error finding rides with rideId ${rideId}: ${error.message}`);
  }
}

//route
router.post('/getRide', async (req, res) => {
  try {
    const { rideId } = req.body;

    const ride = await getRide(rideId);
    res.json(ride);
  } catch (error) {
    res.status(500).json({ error: `Error retrieving ride data: ${error.message}` });
  }
});
//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
//            Get Upcoming Rides
//------------------------------------------------------------------------------------------
async function getUpcomingRides() {
  try {
    const upcomingRides = await prisma.ride.findMany({
      where: {
        dateTime: {
          gt: new Date(),  // Checks if the ride's dateTime is greater than the current date and time
        },
      },
    });

    return upcomingRides;
  } catch (error) {
    throw new Error(`Error fetching upcoming rides: ${error.message}`);
  }
}

//route
router.post('/getUpcomingRides', async (req, res) => {
  try {
    const rides = await getUpcomingRides();
    res.json(rides);
  } catch (error) {
    res.status(500).json({ error: `Error retrieving rides: ${error.message}` });
  }
});
//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
//            Update Ride (by id)
//------------------------------------------------------------------------------------------
async function updateRide(id, newData) {
  try {
    const updatedRide = await prisma.ride.update({
      where: {
        id: id,
      },
      data: newData,
    });
    return updatedRide;
  } catch (error) {
    throw new Error(`Error updating ride with id ${id}: ${error.message}`);
  }
}

//route
router.post('/updateRide', async (req, res) => {
  try {
    const { id, newData } = req.body;

    const updatedRide = await updateRide(id, newData);
    res.json(updatedRide);
  } catch (error) {
    res.status(500).json({ error: `Error updating ride data: ${error.message}` });
  }
});

//------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------
//            Approve Ride with ids
//------------------------------------------------------------------------------------------
async function approveRide(userId, rideId, approval) {

  let approvalStatus = Approval.PENDING
  switch (approval) {
    case 'APPROVED':
      approvalStatus = Approval.APPROVED
      break;
    case 'DENIED':
      approvalStatus = Approval.DENIED
      break;
  }

  try {
    const approvalRequest = await prisma.rideRequests.update({
      where: {
        userId_rideId: {
          userId: userId,
          rideId: rideId,
        },
      },
      data: {
        approval: approvalStatus,  // Updating the approval status
      },
    });
    return approvalRequest;
  } catch (error) {
    throw new Error(`Error updating ride with id : ${error.message}`);
  }
}

//route
router.post('/approveRide', async (req, res) => {
  try {
    const { userId, rideId, approval } = req.body;

    const approvalRequest = await approveRide(userId, rideId, approval);
    res.json(approvalRequest);
  } catch (error) {
    res.status(500).json({ error: `Error approving ride request: ${error.message}` });
  }
});

//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
//            Request Ride with ids
//------------------------------------------------------------------------------------------
async function createRideRequest(requestData) {
  try {
    // Create rideRequest in the database
    const rideRequest = await prisma.rideRequests.create({
      data: requestData,
    });

    return rideRequest;
  } catch (error) {
    throw new Error(`Error creating ride: ${error.message}`);
  }
}
//route
router.post('/createRideRequest', async (req, res) => {
  try {
    const requestData = req.body;

    const rideRequest = await createRideRequest(requestData);
    res.json(rideRequest);
  } catch (error) {
    res.status(500).json({ error: `Error approving ride request: ${error.message}` });
  }
});

//------------------------------------------------------------------------------------------

module.exports = router;
