import { BackendUserRegistration, UserRegistration } from "@/types/module/authModule";
import { removeDot } from "@/utils/functions";

export function ConvertAuthData(
    userData: UserRegistration
): BackendUserRegistration {
    return {
        title: removeDot(userData?.title),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        mobileNumber: userData.mobileNumber,
        userName: userData.userName,
        companyName: userData?.companyName,
        registerAs: userData?.registerAs?.toLocaleLowerCase(),
        panNumber: userData?.panNumber,
        nameOnPan: userData?.nameOnPan,
        faxNo: userData?.faxNo,
        userTNC: userData?.userTNC,
        landline: userData.landline,
        gstNumber: userData?.gstNumber,
        address: {
            addressLine1: userData.addressLine1,
            addressLine2: userData.addressLine2,
            city: userData.city,
            state: userData.state,
            pinCode: userData.pinCode,
            country: userData.country,
        }
    }
}