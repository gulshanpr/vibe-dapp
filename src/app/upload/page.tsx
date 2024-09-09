'use client'
import { FileUpload } from '@/components/ui/file-upload'
import React from 'react'

const Upload = () => {
  return (
    <div className='flex justify-center mt-[50px]'>
        <div className=" top-[50px] right-[50px]">
            <div className="bg-white">
                <FileUpload />
            </div>
        </div>
</div>  )
}

export default Upload