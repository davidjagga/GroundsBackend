const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


//------------------------------------------------------------------------------------------
//            Get Upcoming Rides
//------------------------------------------------------------------------------------------

router.post('/getUpcomingRides', async (req, res) => {
  try {
    const upcomingRides = await prisma.ride.findMany({
      where: {
        dateTime: {
          gt: new Date(),  // Checks if the ride's dateTime is greater than the current date and time
        },
      },
    });

    res.json(upcomingRides);
  } catch (error) {
    res.status(500).json({ error: `Error retrieving rides: ${error.message}` });
  }
});
//------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------
//            Get Rides by Query
//------------------------------------------------------------------------------------------

router.post('/getRidesByQuery', async (req, res) => {
  const {query} = req.body;
  try {
    const upcomingRides = await prisma.ride.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: insensitive
            },
          }, 
          {
            desc: {
              contains: query,
              mode: insensitive
            }
          },
          {
            start: {
              city: {
                contains: query,
                mode: insensitive
              }
            }
          },{
            start: {
              state: {
                contains: query,
                mode: insensitive
              }
            }
          },{
            start: {
              title: {
                contains: query,
                mode: insensitive
              }
            }
          },
          {
            destination: {
              city: {
                contains: query,
                mode: insensitive
              }
            }
          },{
            destination: {
              state: {
                contains: query,
                mode: insensitive
              }
            }
          },{
            destination: {
              title: {
                contains: query,
                mode: insensitive
              }
            }
          },
          {
            creator:{
              name: {
                contains: query,
                mode: insensitive
              }
            }
          }
        ]
      },
    });

    res.json(upcomingRides);
  } catch (error) {
    res.status(500).json({ error: `Error retrieving rides: ${error.message}` });
  }
});
//------------------------------------------------------------------------------------------

module.exports = router;