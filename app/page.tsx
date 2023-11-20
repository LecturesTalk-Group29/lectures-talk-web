import Image from 'next/image'
import { TextField, Button, Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import faqs from "./faqs.json";
import TryNowButton from './TryNowButton';
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <main>
        <Container>


          {/* Hero Section */}
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


          {/* Features Section */}
          <Box className="mt-40 mb-5">
            {/* <Typography variant="h3" className='mb-6 w-full text-center' component="h1">
              Features
            </Typography> */}
            <Box className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-x-6 gap-y-16">
              {/* White Divider */}
              <Box className="col-start-2 col-end-3 row-start-1 row-end-5 hidden h-full w-full md:flex md:justify-center md:items-center">
                <Box className="border border-white h-full w-1"></Box>
              </Box>

              <Box className="h-96">
                <Image
                  className="w-full h-full object-cover"
                  src={"/hand-up-auditorium.jpg"}
                  width={700}
                  height={700}
                  alt="Person sitting alone in auditorium"
                />
              </Box>
              <Box className="h-96">
                <Typography variant="h3" className='uppercase mb-6 w-full' component="h1">
                  Lecture - <span className='text-accent'>Summarized </span>
                </Typography>
                Input a video link and receive a detailed transcript along with a concise summary. Capture the essence of lectures without watching the entire video.
              </Box>
              <Box className="h-96 row-start-4 md:row-start-auto">
                <Typography variant="h3" className='uppercase mb-6 w-full' component="h1">
                  <span className='text-accent'>Clickable </span>Timestamps
                </Typography>
                Navigate lectures with ease. Each point in the summary and transcript is linked to a specific timestamp, allowing direct access to key moments.
              </Box>
              <Box className="h-96">
                <Image
                  className="w-full h-full object-cover"
                  src={"/womand-on-stage.jpg"}
                  width={700}
                  height={700}
                  alt="Person sitting alone in auditorium"
                />
              </Box>
              <Box className="h-96">
                <Image
                  className="w-full h-full object-cover"
                  src={"/presenter-presents.jpg"}
                  width={700}
                  height={700}
                  alt="Person sitting alone in auditorium"
                />
              </Box>
              <Box className="h-96">
                <Typography variant="h3" className='uppercase mb-6 w-full' component="h1">
                  <span className='text-accent'>Interactive </span> Chat
                </Typography>
                Engage with a context-aware chat feature that answers your questions using information from the uploaded lecture, mimicking a personal session with a professor.
              </Box>
              <Box className="h-96">
                <Typography variant="h3" className='uppercase mb-6 w-full' component="h1">
                  <span className='text-accent'>Seamless </span> Learning
                </Typography>
                Our app links text and video content, offering a holistic learning experience. Jump between the transcript, summary, and video effortlessly.
              </Box>
              <Box className="h-96 row-start-7 md:row-start-auto">
                <Image
                  className="w-full h-full object-cover"
                  src={"/zoom-class.jpg"}
                  width={700}
                  height={700}
                  alt="Person sitting alone in auditorium"
                />
              </Box>
            </Box>
          </Box>




          {/* FAQ section*/}
          <Box className="mt-28 mb-10">
            <Box className="mb-5">
              <Typography variant="h4" className='hidden md:block ml-3 w-full text-center' component="h1">
                Frequently Asked Questions
              </Typography>
              <Typography variant="h4" className='md:hidden ml-3 w-full text-center' component="h1">
                FAQ
              </Typography>
            </Box>

            <Box>
              {faqs.map((faq, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    className='bg-background'
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}a-content`}
                    id={`panel${index}a-header`}
                  >
                    <Box className="flex items-center h-12">
                    <Typography>{faq.question}</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails className='bg-background'>
                    <Typography>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>

        </Container>
      </main>
      <Footer />
    </>
  )
}
