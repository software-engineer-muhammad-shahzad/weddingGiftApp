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

    const {
        register,
        handleSubmit,
        reset,
        trigger,
        formState: { errors, isValid },
    } = useForm<FormValues>({
        mode: "onChange",
        defaultValues: {
            fullName: "",
            partnerName: "",
            eventDate: "",
            email: "",
            phoneNumber: "",
        },
    })

    useEffect(() => {
        if (profileInfoData) {
            reset({
                fullName: profileInfoData.fullName,
                partnerName: profileInfoData.partnerName,
                eventDate: profileInfoData.eventDate?.split("T")[0],
                email: profileInfoData.email,
                phoneNumber: profileInfoData.phoneNumber,
            })
            void trigger()
        }
    }, [profileInfoData, reset, trigger])

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
                <div className="flex flex-col gap-1">
                    <Input
                        label="Name"
                        error={errors.fullName?.message}
                        {...register("fullName", {
                            required: "Name is required",
                            minLength: { value: 2, message: "Name must be at least 2 characters" },
                            maxLength: { value: 50, message: "Name must be at most 50 characters" },
                            pattern: {
                                value: /^[A-Za-z][A-Za-z\s.'-]*$/,
                                message: "Enter a valid name",
                            },
                        })}
                    />
                    {errors.fullName && (
                        <p className="ps-5 text-xs text-red-500">{errors.fullName.message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <Input
                        label="Partner Name"
                        error={errors.partnerName?.message}
                        {...register("partnerName", {
                            required: "Partner name is required",
                            minLength: { value: 2, message: "Partner name must be at least 2 characters" },
                            maxLength: { value: 50, message: "Partner name must be at most 50 characters" },
                            pattern: {
                                value: /^[A-Za-z][A-Za-z\s.'-]*$/,
                                message: "Enter a valid partner name",
                            },
                        })}
                    />
                    {errors.partnerName && (
                        <p className="ps-5 text-xs text-red-500">{errors.partnerName.message}</p>
                    )}
                </div>

                <Input type="date" label="Event Date" {...register("eventDate")} />
                <Input label="Email" type="email" readOnly {...register("email")} className="border-none outline-none font-normal text-[#989898] placeholder:text-[#989898] text-sm bg-transparent w-full cursor-not-allowed" />

                <div className="flex flex-col gap-1">
                    <Input
                        label="Contact Number"
                        type="tel"
                        error={errors.phoneNumber?.message}
                        {...register("phoneNumber", {
                            required: "Contact number is required",
                            pattern: {
                                value: /^\+?[0-9]{7,15}$/,
                                message: "Enter a valid contact number",
                            },
                        })}
                    />
                    {errors.phoneNumber && (
                        <p className="ps-5 text-xs text-red-500">{errors.phoneNumber.message}</p>
                    )}
                </div>
                <div className="mt-5 w-full">
                    <Button type="submit" className="w-full py-3! md:py-4!" disabled={isLoading || !isValid}>
                        {isLoading ? "Updating..." : "Update"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ProfileInfoEditForm