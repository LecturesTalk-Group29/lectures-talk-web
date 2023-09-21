import Image from 'next/image'
import Box from "@mui/material/Box";
import { TextField, Button } from '@mui/material';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

export default function Home() {
  return (
    <main className='flex-grow'>
      <Box className="grid place-items-center h-full">
        <Box className="flex flex-col md:flex-row items-center w-10/12 md:w-1/2 space-x-4 space-y-3">
          <SubscriptionsIcon />
          <TextField className="flex-grow w-full md:w-auto" id="outlined-basic" label="Lecture URL" variant="outlined" />
          <Button className='bg-blue-700 text-white h-14 w-full md:w-auto' variant="contained">Do AI magic</Button>
        </Box>
      </Box>
    </main>
  )
}
