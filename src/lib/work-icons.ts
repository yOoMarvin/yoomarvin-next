import type { ComponentType } from 'react'
import {
    Atom,
    Code,
    Figma,
    LightBulb,
    Mail,
    SelectFace3d,
    Wrench,
    ProjectCurve3d,
} from 'iconoir-react'

export const iconMap: Record<
    string,
    ComponentType<{ width?: number; height?: number; className?: string }>
> = {
    Figma,
    Mail,
    Atom,
    Code,
    Wrench,
    SelectFace3d,
    LightBulb,
    ProjectCurve3d,
}
