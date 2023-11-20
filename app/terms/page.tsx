import { Container, Button, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import Footer from "./../Footer";

export default function TermsAndConditions() {
    return (
        <>
            <main>
                <Container maxWidth="md">
                    <Box className="mt-9 mb-7 flex items-center justify-between w-full">
                        <Typography className='mt-5 w-full' variant="h3" gutterBottom>
                            Terms and Conditions
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
                                These Terms and Conditions govern your use of our application. By accessing and using our application, you agree to comply with these Terms and Conditions.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    {/* Repeat for each section */}
                    <Accordion>
                        <AccordionSummary className='bg-background' expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">2. Use of Application</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='bg-background'>
                            <Typography variant="body1">
                                The application is intended for educational purposes only. Users are responsible for the content they upload and the consequences of using the app.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    {/* ... */}
                    <Accordion>
                        <AccordionSummary className='bg-background' expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">3. Uploaded Content</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='bg-background'>
                            <Typography variant="body1">
                                All lectures uploaded to the application are stored on our servers. We do not guarantee the security or confidentiality of any content uploaded to the application.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary className='bg-background' expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">4. Disclaimer of Warranties</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='bg-background'>
                            <Typography variant="body1">
                                The application is provided "as is" without any warranties, express or implied. We do not warrant that the app will be available at any particular time or location.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary className='bg-background' expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">5. Limitation of Liability</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='bg-background'>
                            <Typography variant="body1">
                                We shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from the use of, or the inability to use, the application.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary className='bg-background' expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">6. Data Storage and Security</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='bg-background'>
                            <Typography variant="body1">
                                User data is stored in Mongo DB. We do not claim that the storage solution is entirely secure and are not responsible for any data breaches or loss.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary className='bg-background' expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">7. Contact Information</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='bg-background'>
                            <Typography variant="body1">
                                For any inquiries or concerns regarding these terms, please contact us at <a className='text-accent' href="mailto:gusev@sheridancollege.ca">gusev@sheridancollege.ca</a>.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary className='bg-background' expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">8. Amendments to Terms and Conditions</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='bg-background'>
                            <Typography variant="body1">
                                We reserve the right to amend these Terms and Conditions at any time. Your continued use of the application following any changes constitutes your acceptance of these changes.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>


                </Container>
            </main>
            <Footer />
        </>
    );
}
