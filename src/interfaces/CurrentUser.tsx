interface CurrentUser {
  fullName: string | null,
  displayImageUrl: string | null,
  lastRetrieved: Date | null
}

export default CurrentUser;