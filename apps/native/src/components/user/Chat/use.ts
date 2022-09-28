export {}

// export const use = () => {
//    const { socket } = useSocket()

//    const { lastUnreadMessageIndex, setUnreadMessagesAmount } = useChatDetails()

//    const messagesRef = useRef<HTMLDivElement>()

//    const endOfMessages = useRef()

//    const [isLoading, setIsLoading] = useState(true)

//    const [isLoadingMoreMessages, setIsLoadingMoreMessages] = useState(false)

//    const [isFileUploading, setIsFileUploading] = useState(false)

//    const [canScrollAfterLoadingMoreMessages, setCanScrollAfterLoadingMoreMessages] = useState(false)

//    const [currentUserId, setCurrentUserId] = useState()

//    const [currentUserName, setCurrentUserName] = useState()

//    const [messages, setMessages] = useState([])

//    const [message, setMessage] = useState('')

//    const [hasMoreMessages, setHasMoreMessages] = useState(true)

//    const [lastScroll, setLastScroll] = useState()

//    const areThereMessages = messages.length > 0

//    useEffect(() => {
//       getMessages(20, 0, null)
//    }, [])

//    useEffect(() => {
//       const handleOnSendMessage = (message: any) => {
//          // setMessages(messages => [...messages, message])
//          scrollToLastMessage()
//          socket?.emit('readMessages')
//       }

//       socket?.on('sendMessage', handleOnSendMessage)

//       return () => {
//          socket?.off('sendMessage', handleOnSendMessage)
//       }
//    }, [socket])

//    const getMessages = async (limit: any, offset: any, e: any) => {
//       const url = `${API_URL}/api/user/getMessages`
//       if (!isLoadingMoreMessages && e && e.nativeEvent.contentOffset.y <= 0 && hasMoreMessages) {
//          e.persist()

//          setLoading(true)

//          setIsLoadingMoreMessages(true)

//          const response = await axios.post(url, {
//             limit,
//             offset,
//          })

//          if (response) {
//             const { messages: loadedMessages } = response.data

//             const hasMoreMessages = loadedMessages.length !== 0

//             setHasMoreMessages(loadedMessages.length !== 0)

//             // setMessages(messages => [...loadedMessages, ...messages])

//             setIsLoadingMoreMessages(false)

//             hasMoreMessages && setCanScrollAfterLoadingMoreMessages(true)

//             if (!hasMoreMessages) {
//                setLoading(false)
//             }

//             if (lastUnreadMessageIndex) {
//                if (loadedMessages.length + messages.length >= lastUnreadMessageIndex) {
//                   setUnreadMessagesAmount(0)
//                }
//             }
//          }
//       }
//       if (!e) {
//          const response = await customAxios.post(url, {
//             limit,
//             offset,
//          })

//          if (response) {
//             setIsLoading(false)

//             const { messages, userId, userName } = response.data

//             setCurrentUserId(userId)

//             setCurrentUserName(userName)

//             setMessages(messages)

//             scrollToLastMessage()

//             if (lastUnreadMessageIndex) {
//                if (messages.length >= lastUnreadMessageIndex) {
//                   setUnreadMessagesAmount(0)
//                }
//             }
//          }
//       }
//    }

//    const getUnreadMessages = async () => {
//       const url = `${API_URL}/api/user/getMessages`

//       const response = await customAxios.post(url, {
//          limit: lastUnreadMessageIndex,
//          offset: 0,
//       })

//       if (response) {
//          const { messages } = response.data

//          setMessages(messages)

//          // messagesRef.current?.scrollTo({
//          //    x: 0,
//          //    y: 0,
//          //    animated: false,
//          // })

//          setUnreadMessagesAmount(0)
//       }
//    }

//    const sendMessage = async () => {
//       if (message.trim()) {
//          const lastMessage = messages[messages.length - 1]

//          // const id = lastMessage ? lastMessage.id + 1 : 0

//          const _message = {
//             id: 1,
//             type: 'MESSAGE',
//             content: message,
//             userId: currentUserId,
//             userName: currentUserName,
//             createdAt: new Date(),
//          }

//          // setMessages(messages => [...messages, _message])

//          scrollToLastMessage()

//          setMessage('')

//          try {
//             const url = `${API_URL}/api/user/sendMessage`

//             const response = await axios.post(url, {
//                content: message,
//             })

//             if (response) {
//                socket?.emit('sendMessage', _message)
//             }
//          } catch (error) {
//             const conversation = messages

//             setMessages(conversation)
//          }
//       }
//    }
//    const sendFile = async () => {
//       setIsFileUploading(true)

//       const file = await DocumentPicker.pick({
//          type: [DocumentPicker.types.allFiles],
//       })

//       // const imageExtensions = /\.(jpg|jpeg|png|gif)$/i
//       // const videoExtensions = /\.(mp4)$/i
//       // const fileExtensions = /\.(txt|rtf|doc|docx|xlsx|ppt|pptx|pdf)$/i
//       // const isImage = imageExtensions.test(name)
//       // const isVideo = videoExtensions.test(name)
//       // const isFile = fileExtensions.test(name)

//       // const largeSizeError = () => {
//       //    return utils.setFeedbackData(
//       //       'Sending a file',
//       //       'You cannot send file with such a large size'
//       //    )
//       // }

//       // if (!isImage && !isVideo && !isFile) {
//       //    resetFileInput()
//       //    return utils.setFeedbackData(
//       //       'Sending a file',
//       //       'You cannot send file with such an extension'
//       //    )
//       // }

//       // if (isImage) {
//       //    if (size > 31457280) {
//       //       largeSizeError()
//       //    }
//       // }

//       // if (isVideo) {
//       //    if (size > 52428800) {
//       //       largeSizeError()
//       //    }
//       // }

//       // if (isFile) {
//       //    if (size > 10485760) {
//       //       largeSizeError()
//       //    }
//       // }

//       const form = new FormData()

//       form.append('file', file)

//       try {
//          const url = `${API_URL}/api/user/sendFile`

//          const response = await axios.post(url, form)

//          if (response) {
//             setIsFileUploading(false)

//             const { type, content } = response.data

//             const lastMessage = messages[messages.length - 1]

//             // const id = lastMessage ? lastMessage.id + 1 : 0

//             const message = {
//                id: 1,
//                type,
//                content,
//                userId: currentUserId,
//                userName: currentUserName,
//                createdAt: new Date(),
//             }

//             // setMessages([...messages, message])

//             scrollToLastMessage()

//             socket?.emit('sendMessage', message)
//          }
//       } catch (error) {
//          // utils.setFeedbackData(
//          //    'Sending a file',
//          //    'There was an unexpected problem when sending the file'
//          // )
//       }
//    }

//    const scrollToLastMessage = () => {
//       console.log('sd')
//    }
//    // messagesRef.current.scrollToEnd({
//    //    animated: true,
//    // })
//    const handleOnContentSizeChange = (_: any, h: any) => {
//       if (!lastScroll || lastScroll !== h) {
//          setLastScroll(h)
//       }
//       if (canScrollAfterLoadingMoreMessages) {
//          // messagesRef.current.scrollTo({
//          //    x: 0,
//          //    y: h - lastScroll,
//          //    animated: false,
//          // })

//          setLoading(false)

//          setLastScroll(h)

//          setCanScrollAfterLoadingMoreMessages(false)
//       }
//    }
// }
