import Image from 'next/image'
import { TextField, Button, Box, Container, Typography } from '@mui/material';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import TryNowButton from './TryNowButton';
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <main>
        <Container>
          <Box className="mt-5 md:flex">
            <Box className="relative">
              <Image
                //Photo by Philippe Bout on Unsplash
                className="cut-corners-mobile md:cut-corners w-full h-full object-cover"
                src={"/dude-in-auditorium.jpg"}
                width={700}
                height={700}
                alt="Person sitting alone in auditorium"
              />
              {/* <Box className="absolute inset-0 bg-gradient-to-bl from-transparent to-white"></Box> */}
              <Box className="absolute inset-0 md:hidden flex flex-col justify-center sm:mb-16">
                <Typography
                  variant="h3"
                  className="w-8/12 text-2xl sm:text-3xl"
                >
                  Lecture:{" "}
                  <span className="text-accent">INTERACTIVE</span>{" "}

                </Typography>
                <Typography
                  variant="subtitle1"
                  className="w-7/12 sm:text-base text-xs"
                >
                  Transform passive listening into{" "}
                  <span className="text-accent">active comprehension</span>
                </Typography>
                <Box className="pt-3 w-1/2">
                  <TryNowButton
                    size="medium"
                    className="bg-accent rounded-2xl mt-2 hover:bg-hoveraccent"
                  />
                </Box>
              </Box>
            </Box>

            <Box className="hidden md:flex flex-col justify-center align-middle md:pl-2 md:mb-14 md:space-y-2">
              <Typography variant="h3">
                Lecture: <span className="text-accent">INTERACTIVE</span>{" "}
              </Typography>
              <Typography variant="subtitle1">
                Transform passive listening into{" "}
                <span className="text-accent">active comprehension</span>
              </Typography>
              <Box className="pt-3">
                <TryNowButton
                  size="large"
                  className="bg-accent rounded-2xl md:mt-2 hover:bg-hoveraccent"
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </main>
      <Footer />
    </>
  )
}
