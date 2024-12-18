const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//------------------------------------------------------------------------------------------
//            Create User (by email, etc.)
//------------------------------------------------------------------------------------------
async function createUser(userData) {
  try {
    const user = await prisma.user.create({
      data: userData,
    });
    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

//route
router.post('/createUser', async (req, res) => {
  try {
    // Get userData from req.body
    const userData = req.body;

    const user = await createUser(userData);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: `Error creating user data: ${error.message}` });
  }
});

//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
//            Delete User (by email)
//------------------------------------------------------------------------------------------
async function deleteUser(id) {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return deletedUser;
  } catch (error) {
    throw new Error(`Error deleting user with id ${id}: ${error.message}`);
  }
}

//route
router.post('/deleteUser', async (req, res) => {
  try {
    const { id } = req.body;

    const deletedUser = await deleteUser(id);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: `Error deleting user: ${error.message}` });
  }
});

//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
//            Update User (by email)
//------------------------------------------------------------------------------------------
async function updateUser(id, newData) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: newData,
    });
    return updatedUser;
  } catch (error) {
    throw new Error(`Error updating user with id ${id}: ${error.message}`);
  }
}

//route
router.post('/updateUser', async (req, res) => {
  try {
    const { id, newData } = req.body;

    const updatedUser = await updateUser(id, newData);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: `Error updating user data: ${error.message}` });
  }
});

//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
//            Search User by Name Prefix
//------------------------------------------------------------------------------------------
async function findUsersByName(namePrefix) {
  try {
    const matchingUsers = await prisma.user.findMany({
      where: {
        name: {
          contains: namePrefix.toLowerCase(),
        },
      },
    });
    return matchingUsers;
  } catch (error) {
    throw new Error(`Error finding users by name prefix ${namePrefix}: ${error.message}`);
  }
}

//route
router.post('/userByName', async (req, res) => {
  try {
    const { namePrefix } = req.body;

    const users = await findUsersByName(namePrefix);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: `Error fetching user data: ${error.message}` });
  }
});

//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
//            Get User by Id
//------------------------------------------------------------------------------------------

async function getUserData(id) {
  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        rides: true,
        rideRequests: true,
  
      },
    });

    return foundUser;
  } catch (error) {
    throw new Error(`Error finding user with id ${id}: ${error.message}`);
  }
}

//route
router.post('/getUser', async (req, res) => {
  try {
    const { id } = req.body;

    const user = await getUserData(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: `Error fetching user data: ${error.message}` });
  }
});

//------------------------------------------------------------------------------------------

module.exports = router;
  