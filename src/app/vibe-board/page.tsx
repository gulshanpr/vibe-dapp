import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';

import React from 'react'

const socialMediaUsers = [
  {
    username: "Alice Johnson",
    url: "https://lh3.googleusercontent.com/a/ACg8ocItYJ5QOoCQ0afbiogJxptMR5ZEMz_QqJBIAjt0AwuWxG9xnQ=s96-c",
    auraPoint: 85,
    vibeTagsCount: 12,
  },
  {
    username: "Bob Smith",
    url: "https://lh3.googleusercontent.com/a/ACg8ocItYJ5QOoCQ0afbiogJxptMR5ZEMz_QqJBIAjt0AwuWxG9xnQ=s96-c",
    auraPoint: 40,
    vibeTagsCount: 5,
  },
  {
    username: "Charlie Davis",
    url: "https://lh3.googleusercontent.com/a/ACg8ocItYJ5QOoCQ0afbiogJxptMR5ZEMz_QqJBIAjt0AwuWxG9xnQ=s96-c",
    auraPoint: 90,
    vibeTagsCount: 20,
  },
  {
    username: "Dana Lee",
    url: "https://lh3.googleusercontent.com/a/ACg8ocItYJ5QOoCQ0afbiogJxptMR5ZEMz_QqJBIAjt0AwuWxG9xnQ=s96-c",
    auraPoint: 30,
    vibeTagsCount: 8,
  },
  {
    username: "Eva Green",
    url: "https://lh3.googleusercontent.com/a/ACg8ocItYJ5QOoCQ0afbiogJxptMR5ZEMz_QqJBIAjt0AwuWxG9xnQ=s96-c",
    auraPoint: 75,
    vibeTagsCount: 15,
  },
  {
    username: "Frank Moore",
    url: "https://lh3.googleusercontent.com/a/ACg8ocItYJ5QOoCQ0afbiogJxptMR5ZEMz_QqJBIAjt0AwuWxG9xnQ=s96-c",
    auraPoint: 50,
    vibeTagsCount: 7,
  },
  {
    username: "Grace Wilson",
    url: "https://lh3.googleusercontent.com/a/ACg8ocItYJ5QOoCQ0afbiogJxptMR5ZEMz_QqJBIAjt0AwuWxG9xnQ=s96-c",
    auraPoint: 95,
    vibeTagsCount: 25,
  },
];




const VibeBoard = () => {
  return (
    <div className="flex justify-center">
      <Table className="rounded border w-full max-w-[40%] mx-auto my-[110px]">
        <TableCaption>Top vibers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center px-[10px]">
            <WhatshotOutlinedIcon/>viber</TableHead>
            <TableHead className="text-center px-[10px]">user name</TableHead>
            <TableHead className="text-center px-[10px]">Total Aura</TableHead>
            <TableHead className="text-center px-[10px]">Vibe tag count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {socialMediaUsers.map((invoice) => (
            <TableRow key={invoice.username}>
              <TableCell className="text-center px-[10px]">
                <img
                  src={invoice.url}
                  alt="Avatar"
                  className="w-[36px] h-[36px] rounded-full mx-auto"
                />
                <p>{invoice.username}</p>
              </TableCell>
              <TableCell className="text-center font-medium px-[10px]">{invoice.username}</TableCell>
              <TableCell className="text-center px-[10px]">{invoice.auraPoint}</TableCell>
              <TableCell className="text-center px-[10px]">{invoice.vibeTagsCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right px-[10px]">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  )
}

export default VibeBoard;