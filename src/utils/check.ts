import { fileFormats } from '../common/constants/appData';

export const getIsAvailableFileFormat = (format: string | null): boolean => Boolean(format && fileFormats.includes(format));
