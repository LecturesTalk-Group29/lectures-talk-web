import { Button, Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import Footer from "./../Footer";

export default function Privacy() {
    return (
        <>
            <main>
                <Container maxWidth="md">
                    <Box className="mt-9 mb-7 flex items-center justify-between w-full">
                        <Typography className='mt-5 w-full' variant="h3" gutterBottom>
                            Privacy Policy
                        </Typography>
                        <Button
                            className='p-0 h-16'
                            href="/"
                            variant="text"
                            color="secondary"
                            size="small"
                            >
                                <CloseIcon />
                        </Button>
                    </Box>
                    <Typography variant="body1" paragraph>
                        Last updated: November 11, 2023
                    </Typography>

                    <Accordion>
                        <AccordionSummary className='bg-background' expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">1. Introduction</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='bg-background'>
                            <Typography variant="body1">
                                This Privacy Policy outlines our practices concerning the collection, use, and disclosure of user data when you use our application. By using the app, you agree to the collection and use of information in accordance with this policy.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary className='bg-background' expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">2. Data Collection and Use</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='bg-background'>
                            <Typography variant="body1">
                                We collect information that you provide us directly, such as when you upload lecture videos. All information is stored in our Mongo DB database. Please be aware that this project does not claim to be secure.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary className='bg-background' expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">3. Data Storage</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='bg-background'>
                            <Typography variant="body1">
                                All uploaded lectures are saved on our server. We take reasonable steps to protect the data we collect from unauthorized access, disclosure, alteration, or destruction.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary className='bg-background' expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">4. Disclaimer</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='bg-background'>
                            <Typography variant="body1">
                                We are not responsible for any loss or damage arising from the use of our application. Users are advised to use the app at their own risk.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary className='bg-background' expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">5. Contact Information</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='bg-background'>
                            <Typography variant="body1">
                                If you wish to inquire about your data or request its deletion, please contact us at <a className='text-accent' href="mailto:gusev@sheridancollege.ca">gusev@sheridancollege.ca</a>.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary className='bg-background' expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">6. Changes to This Privacy Policy</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='bg-background'>
                            <Typography variant="body1">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Container>
            </main>
            <Footer />
        </>
    );
}
