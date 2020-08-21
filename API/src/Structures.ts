/**
 * represents an identifier
 */
export class Id {
    id: string;

    constructor(insertedId: string) {
        this.id = insertedId
    }
}

/**
 * represents the existing user types
 */
export enum UserType {
    Volunteer = 'volunteer',
    Org = 'org'
}

/**
 * represents the existing image types
 */
export enum ImageType {
    Volunteer = 'volunteer',
    Org = 'org',
    Post = 'post',
    Event = 'event'
}

/**
 * returns image type associated with string
 */
export function getImageTypeForString(type: string): ImageType {
    switch (type) {
        case 'volunteers': return ImageType.Volunteer
        case 'orgs': return ImageType.Org
        case 'posts': return ImageType.Post
        default: return ImageType.Event
    }
}

/**
 * representation of session
 */
export class Session {
    id: string
    user_type: string

    constructor(id: string, user_type: string) {
        this.id = id
        this.user_type = user_type
    }
}

/**
 * representation of error
 */
export class Error {
    message: string

    constructor(message: string) {
        this.message = message
    }
}

/**
 * represents a status message
 */
export class Status {
    message: string
    success: boolean

    constructor(message: string, success: boolean) {
        this.message = message
        this.success = success
    }
}