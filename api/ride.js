const express = require('express');
const router = express.Router();
const { PrismaClient, Approval } = require('@prisma/client');

const prisma = new PrismaClient();

//------------------------------------------------------------------------------------------
//            Create Ride
//------------------------------------------------------------------------------------------

router.post('/createRide', async (req, res) => {
  const rideData = req.body;

  try {
    // Create ride in the database
    const ride = await prisma.ride.create({
      data: rideData,
    });

    res.json(ride);
  } catch (error) {
    res.status(500).json({ error: `Error creating ride data: ${error.message}` });
  }
  
});

//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
//            Delete Ride (by ID)
//------------------------------------------------------------------------------------------

router.post('/deleteRide', async (req, res) => {
  try {
    const { rideID } = req.body;

    const deletedRide = await prisma.ride.delete({
      where: {
        id: rideID,
      },
    });
    res.json(deletedRide);
  } catch (error) {
    res.status(500).json({ error: `Error deleting ride: ${error.message}` });
  }
});
//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
//            Get Ride by id
//------------------------------------------------------------------------------------------

router.post('/getRide', async (req, res) => {
  try {
    const { rideId } = req.body;
    const ride = await prisma.ride.findUnique({
      where: {
        id: rideId,
      },
      include: {
        rideRequests: true,
      }
    });
    res.json(ride);
  } catch (error) {
    res.status(500).json({ error: `Error retrieving ride data: ${error.message}` });
  }
});
//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
//            Update Ride (by id)
//------------------------------------------------------------------------------------------

router.post('/updateRide', async (req, res) => {
  try {
    const { id, newData } = req.body;

    const updatedRide = await prisma.ride.update({
      where: {
        id: id,
      },
      data: newData,
    });
    res.json(updatedRide);
  } catch (error) {
    res.status(500).json({ error: `Error updating ride data: ${error.message}` });
  }
});

//------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------
//            Approve Ride with ids
//------------------------------------------------------------------------------------------

router.post('/approveRide', async (req, res) => {

  try {
    const { userId, rideId, approval } = req.body;

    let approvalStatus = Approval.PENDING
    switch (approval) {
      case 'APPROVED':
        approvalStatus = Approval.APPROVED
        break;
      case 'DENIED':
        approvalStatus = Approval.DENIED
        break;
    }

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

    res.json(approvalRequest);
  } catch (error) {
    res.status(500).json({ error: `Error approving ride request: ${error.message}` });
  }
});

//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
//            Request Ride with ids
//------------------------------------------------------------------------------------------

router.post('/createRideRequest', async (req, res) => {
  try {
    const requestData = req.body;

    const rideRequest = await prisma.rideRequests.create({
      data: requestData,
    });
    res.json(rideRequest);
  } catch (error) {
    res.status(500).json({ error: `Error approving ride request: ${error.message}` });
  }
});

//------------------------------------------------------------------------------------------

module.exports = router;
