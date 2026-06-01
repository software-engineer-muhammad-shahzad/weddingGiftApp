import { formatDate } from "@/app/utils/formatDate"
type Props = {
  data?: {
    fullName?: string
    partnerName?: string
    eventDate?: string
    email?: string
    phoneNumber?: string
  }
 
}

const ShowProfileInfo = ({ data, }: Props) => {
  return (
    <div className="border glass-card border-[#5FDA78] rounded-[30px] mt-4 mb-8">

      <div className="flex flex-col border-b border-b-[#F1F1F11A] py-2 sm:py-4 px-5 md:px-4">
        <p className="font-light text-sm text-[#EEEEEE]">Name</p>
        <p className="font-medium text-sm text-[#EEEEEE]">
          {data?.fullName}
        </p>
      </div>

      <div className="flex flex-col border-b border-b-[#F1F1F11A] py-2 sm:py-4 px-5 md:px-4">
        <p className="font-normal text-sm text-[#EEEEEE]">Partner Name</p>
        <p className="font-bold text-sm text-[#EEEEEE]">
          {data?.partnerName}
        </p>
      </div>

      <div className="flex flex-col py-2 sm:py-4 px-5 md:px-4 border-b border-b-[#F1F1F11A]">
        <p className="font-normal text-sm text-[#EEEEEE]">Event Date</p>
        <p className="font-bold text-sm text-[#EEEEEE]">
          {data?.eventDate ? formatDate(data.eventDate) : "-"}
        </p>
      </div>

      <div className="flex flex-col border-b border-b-[#F1F1F11A] py-2 sm:py-4 px-5 md:px-4">
        <p className="font-normal text-sm text-[#EEEEEE]">Email</p>
        <p className="font-bold text-sm text-[#EEEEEE]">
          {data?.email}
        </p>
      </div>

      <div className="flex flex-col py-2 sm:py-4 px-5 md:px-4">
        <p className="font-normal text-sm text-[#EEEEEE]">
          Contact Number
        </p>
        <p className="font-bold text-sm text-[#EEEEEE]">
          {data?.phoneNumber}
        </p>
      </div>

    </div>
  )
}

export default ShowProfileInfo