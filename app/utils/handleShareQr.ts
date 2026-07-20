export const handleShare = async (name: string, inviteUrl: string): Promise<void> => {
    try {
        if (navigator.share) {
            await navigator.share({
                title: `${name} Wedding`,
                text: `You're invited to ${name}'s wedding!`,
                url: `${inviteUrl}`,
            })
        } else {
            await navigator.clipboard.writeText(`${inviteUrl}`)
            alert("Link copied to clipboard!")
        }
    } catch (error) {
        console.error("Share failed:", error)
    }
}