import { BackendUserRegistration } from "../authModule";

interface Address {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
}

export interface UserData {
    address: Address;
    _id: string;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    userName: string;
    companyName: string;
    registerAs: string;
    isAdmin: boolean;
    panNumber: string;
    nameOnPan: string;
    landline: string;
    faxNo: string;
    userTNC: boolean;
    approvalStatus: ApprovalStatus;
    password: string;
    __v: number;
    gstNumber: string;
}

export interface ManageUserPermissions {
    userEmailId: string;
    approvedByAdmin: boolean;
}


export enum UserPermissionsActions {
    ALLOW = 'ALLOW',
    DENIE = 'DENIE',
}

export enum ApprovalStatus {
    all = 'all',
    pending = 'pending',
    approved = 'approved',
    rejected = 'rejected',
}


export interface UserBEData {
    totalPages: number;
    totalUsers: number;
    users: UserData[] | null;

}


export interface PaginationProps {
    userId?: string
    userStatus?: string
    pageNo?: number,
    queryParameter?: string
}

export enum UserStatus {
    approved,
    pending,
    rejected
}

export interface EditUserDetailsBE {
    userId: string
    updatedData: Partial<BackendUserRegistration>
}


export interface UserListingQueryParameters {
    email?: string
    name?: string
    phoneNo?: string
}