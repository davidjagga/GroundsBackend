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

router.post('/getLocation', async (req, res) => {
  
  const locationData = req.body;

  try {
    const location = await prisma.location.findUnique({
      where: {
        id: locationData.id,
      }
    });
    res.json(location);
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
});

//-------------------------------------------------------------------------------------------

module.exports = router;
  