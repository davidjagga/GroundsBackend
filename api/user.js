const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//------------------------------------------------------------------------------------------
//            Create User (by email, etc.)
//------------------------------------------------------------------------------------------

router.post('/createUser', async (req, res) => {
  try {
    // Get userData from req.body
    const userData = req.body;

    const user = await prisma.user.create({
      data: userData,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: `Error creating user data: ${error.message}` });
  }
});

//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
//            Delete User (by email)
//------------------------------------------------------------------------------------------

router.post('/deleteUser', async (req, res) => {
  try {
    const { id } = req.body;

    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: `Error deleting user: ${error.message}` });
  }
});

//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
//            Update User (by email)
//------------------------------------------------------------------------------------------

router.post('/updateUser', async (req, res) => {
  try {
    const { id, newData } = req.body;

    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: newData,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: `Error updating user data: ${error.message}` });
  }
});

//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
//            Search User by Name Prefix
//------------------------------------------------------------------------------------------

router.post('/userByName', async (req, res) => {
  try {
    const { namePrefix } = req.body;

    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: namePrefix.toLowerCase(),
        },
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: `Error fetching user data: ${error.message}` });
  }
});

//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
//            Get User by Id
//------------------------------------------------------------------------------------------

router.post('/getUser', async (req, res) => {
  try {
    const { id } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        rides: true,
        rideRequests: true,
  
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: `Error fetching user data: ${error.message}` });
  }
});

module.exports = router;
  