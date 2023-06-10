export interface PackageItem {
    id: number
    name: string;
    type: string;
    quantity: string;
    price: string;
}

export interface AddPackageFormProps {
    listPackage: PackageItem[]
}

export interface AddPackageFilterProps {
    onChangeFilter: (packageName?: string, quantity?: number) => void
    packageNames: string[]
    quantities: number[]
}

export interface PackageFilter {
    packageName?: string
    quantity?: string
}

export interface AddPackageListProps {
    listPackage?: PackageItem[]
}

export interface AddPackageFormActionProps {
    onConfirm: ()=>void
    onCancel: ()=>void
}