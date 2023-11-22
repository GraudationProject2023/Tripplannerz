export interface TagModalProps {
    show: boolean
    onHide: () => void
    onClick: {
        closeTagModal:() => void
    }
}