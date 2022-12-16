export interface AuthUserBio {
	firstName: string
	lastName?: string
	profilePic?: File
}

export interface AuthUserEmail {
	email: string
	type: string
}


export interface userInfo extends Me {
	lastOnline: string | null
}

export interface Me {
	user_id: number
	userBio_id: number
	email: string
	firstName: string
	lastName: null | string
	profilePic: null | string
}

export interface Chat {
	chat_id: number
	unSeenMessages: number

	lastMessage: {
		content: string | null
		updatedAt: string | null
	}
	memberInfo: userInfo
}

export interface messageData {
	chat_id: number,
	user_id: number,
	content: string
}

export interface message {
	chat_id: number
	chat_message_id: number
	content: string
	isSeen: boolean
	createdAt: string
	updatedAt: string
	sender_id: number
}

export interface EditingMessage {
	content: string,
	id: null | number
}
