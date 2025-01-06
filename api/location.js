const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//------------------------------------------------------------------------------------------
//            Create Location (by email, etc.)
//------------------------------------------------------------------------------------------

router.post('/createLocation', async (req, res) => {
  
  const locationData = req.body;

  try {
    const location = await prisma.location.create({
      data: locationData,
    });
    res.json(location);
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
});

//-------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
//            Get Location (by email, etc.)
//------------------------------------------------------------------------------------------

async function getLocationData(id) {
  try {
    const location = await prisma.location.findUnique({
      where: {
        id: id,
      }
    });

    return location;
  } catch (error) {
    throw new Error(`Error finding user with id ${id}: ${error.message}`);
  }
}

//route
router.post('/getLocation', async (req, res) => {
  try {
    const { id } = req.body;

    const location = await getLocationData(id);
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: `Error fetching user data: ${error.message}` });
  }
});

//-------------------------------------------------------------------------------------------

module.exports = router;
  