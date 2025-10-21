import { EditUserDetailsBE } from "@/types/module/adminModules/userModule";
import { Address, UserRegistration } from "@/types/module/authModule";

export function ConvertUpdateUserDataBE(
    userId: string,
    userData: Partial<UserRegistration>
): EditUserDetailsBE {
    return {
        userId: userId as string,
        updatedData: {
            ...(userData?.title && { title: userData.title }),
            ...(userData?.firstName && { firstName: userData.firstName }),
            ...(userData?.lastName && { lastName: userData.lastName }),
            ...(userData?.email && { email: userData.email }),
            ...(userData?.mobileNumber && { mobileNumber: userData.mobileNumber }),
            ...(userData?.userName && { userName: userData.userName }),
            ...(userData?.companyName && { companyName: userData.companyName }),
            ...(userData?.registerAs && {
                registerAs: userData.registerAs.toLocaleLowerCase(),
            }),
            ...(userData?.panNumber && { panNumber: userData.panNumber }),
            ...(userData?.nameOnPan && { nameOnPan: userData.nameOnPan }),
            ...(userData?.faxNo && { faxNo: userData.faxNo }),
            ...(userData?.userTNC && { userTNC: userData.userTNC }),
            ...(userData?.landline && { landline: userData.landline }),
            ...(userData?.gstNumber && { gstNumber: userData.gstNumber }),
            address: {
                ...(userData?.addressLine1 ? {
                    addressLine1: userData?.addressLine1,
                } : {}),
                ...(userData?.addressLine2 ? {
                    addressLine2: userData?.addressLine2,
                } : {}),
                ...(userData?.city ? { city: userData?.city } : {}),
                ...(userData?.state ? { state: userData?.state } : {}),
                ...(userData?.pinCode ? { pinCode: userData?.pinCode } : {}),
                ...(userData?.country ? { country: userData?.country } : {}),

            } as Address,
        },
    };
}
