import { useEffect } from "react"
import { useForm } from "react-hook-form"
import Button from "../../../components/elements/Button"
import Input from "../../../components/elements/Input"
import type { CoupleProfileDetailsData } from "../types/coupleProfileDetails"
import { useUpdateCoupleProfileDetails } from "../hooks/useUpdateCoupleProfile"
import { showSuccess } from "@/app/lib/toast"

interface ProfileInfoEditFormProps {
    profileInfoData: CoupleProfileDetailsData | null
    setIsFormOpen: (value: boolean) => void  // ✅ correct type — it's a function
    refetch?: () => void
}

type FormValues = {
    fullName: string
    partnerName: string
    eventDate: string
    email: string
    phoneNumber: string
}

const ProfileInfoEditForm = ({
    profileInfoData,
    setIsFormOpen,  // ✅ destructure it
    refetch,
}: ProfileInfoEditFormProps) => {

    const { updateProfile, isLoading, isSuccess, setIsSuccess } =
        useUpdateCoupleProfileDetails()

    const { register, handleSubmit, reset } = useForm<FormValues>()

    useEffect(() => {
        if (profileInfoData) {
            reset({
                fullName: profileInfoData.fullName,
                partnerName: profileInfoData.partnerName,
                eventDate: profileInfoData.eventDate?.split("T")[0],
                email: profileInfoData.email,
                phoneNumber: profileInfoData.phoneNumber,
            })
        }
    }, [profileInfoData, reset])

    useEffect(() => {
        if (isSuccess) {
            showSuccess("Profile updated successfully")
            setIsFormOpen(false)  // ✅ close form on success
            setIsSuccess(false)
        }
    }, [isSuccess])

    const onSubmit = async (data: FormValues) => {
        await updateProfile(data)
        refetch?.()
    }

    return (
        <div className="mt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Input label="Name" {...register("fullName")} />
                <Input label="Partner Name" {...register("partnerName")} />
                <Input type="date" label="Event Date" {...register("eventDate")} />
                <Input label="Email" type="email" {...register("email")} />
                <Input label="Contact Number" {...register("phoneNumber")} />
                <div className="mt-5 w-full">
                    <Button type="submit" className="w-full py-3! md:py-4!" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ProfileInfoEditForm