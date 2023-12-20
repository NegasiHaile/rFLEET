import React, { useEffect, useMemo } from 'react'

import ReactWebChat, { createDirectLine, createStore } from 'botframework-webchat'
import { createStyleSet } from 'botframework-webchat'

const BotFrameworkChat = ({ searchValue }: { searchValue: string }) => {
  const BOT_FRAMEWORK_TOKEN = process.env.NEXT_PUBLIC_BOT_FRAMEWORK_TOKEN

  const styleSet = useMemo(
    () =>
      createStyleSet({
        backgroundColor: 'rgba(0, 0, 0, .05)', // background color of the chat window
        primaryFont: 'Arial, sans-serif',
        bubbleBackground: 'rgba(0, 0, 0, .2)',
        bubbleFromUserBackground: 'rgba(0, 0, 0, .2)',
        bubbleBorderRadius: 10,
        bubbleFromUserBorderRadius: 10,
        bubbleTextColor: 'white',
        bubbleFromUserTextColor: 'white',
        sendBoxBackground: 'rgba(0, 0, 0, .2)',
        sendBoxButtonColor: 'white',
        sendBoxTextColor: 'white',
        sendBoxBorderTop: 'rgba(0, 0, 0, .2)',
        sendBoxButtonColorOnHover: 'rgba(0, 0, 0, .8)',
        suggestedActionTextColor: 'white',
        suggestedActionBackgroundColor: 'rgba(0, 0, 0, .2)',
        suggestedActionBackgroundColorOnHover: 'rgba(0, 0, 0, .8)',
        suggestedActionBorderRadius: 10,
        rootHeight: '75vh',
        sendBoxHeight: 70,
        hideUploadButton: true,
        botAvatarInitials: 'BA',
        userAvatarInitials: 'UA',
        botAvatarBackgroundColor: 'rgba(0, 0, 10)',
        userAvatarBackgroundColor: 'rgba(0, 0, 10)'
      }),
    []
  )

  const directLine = useMemo(() => createDirectLine({ token: BOT_FRAMEWORK_TOKEN }), [])
  const userID = useMemo(() => `user-${Math.random().toString(36).substr(2, 9)}`, [])

  const store = useMemo(() => {
    return createStore({}, ({ dispatch }: any) => (next: any) => (action: any) => {
      if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
        console.log('Connection Successful')
        dispatch({
          type: 'DIRECT_LINE/POST_ACTIVITY',
          meta: { method: 'keyboard' },
          payload: {
            activity: {
              type: 'message',
              text: searchValue,
              from: { id: userID, name: userID }
            }
          }
        })
      }

      return next(action)
    })
  }, [userID])

  return (
    <div>
      <div className="border-b border-[#FFFFFF20]">
        <div className="flex justify-center lg:py-[20px] py-[15px]">
          <div className="flex font-bold">
            <h4 className="text-primary">rFLEET.ai</h4>&nbsp;
            <h4>chatbot</h4>
          </div>
        </div>
      </div>
      <ReactWebChat directLine={directLine} userID={userID} styleSet={styleSet} store={store} />
    </div>
  )
}

export default BotFrameworkChat
