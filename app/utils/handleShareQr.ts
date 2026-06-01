export const handleShare = async (name: string, inviteUrl: string): Promise<void> => {
    try {
        if (navigator.share) {
            await navigator.share({
                title: `${name} Wedding`,
                text: `You're invited to ${name}'s wedding!`,
                url: `https://${inviteUrl}`,
            })
        } else {
            await navigator.clipboard.writeText(`https://${inviteUrl}`)
            alert("Link copied to clipboard!")
        }
    } catch (error) {
        console.error("Share failed:", error)
    }
}