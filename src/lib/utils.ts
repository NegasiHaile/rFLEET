import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getImageUrl = (image: { src: string }) => {
  return process.env.NEXT_PUBLIC_URL + image.src
}
