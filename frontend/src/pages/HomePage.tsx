import { ChatContainer } from '@/components/ChatContainer';
import { NoChatSelected } from '@/components/NoChatSelected';
import { SideBar } from '@/components/SideBar';
import { useChatStore } from '@/store/useChatStore'
import * as React from 'react'

const HomePage = () => {
  
  const {selectedUser} = useChatStore();

  

  return (
    <div className='h-screen' style={{backgroundColor: "rgb(24, 14, 23)"}}>
      <div className='flex items-center justify-center pt-20 px-4'  style={{paddingTop: "95px"}}>
        <div className='rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]' style={{backgroundColor: "rgb(30, 21, 30)"}}>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <SideBar/>

            {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage