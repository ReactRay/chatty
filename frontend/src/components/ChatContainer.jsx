import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatInput from './ChatInput'
import ChatHeader from './ChatHeader'
const ChatContainer = () => {

    const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore()


    useEffect(() => {
        getMessages(selectedUser._id)
    }, [selectedUser._id, getMessages])

    if (isMessagesLoading) return <div>loading ...</div>



    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />

            <p>messages ...</p>


            <ChatInput />
        </div>
    )
}

export default ChatContainer
