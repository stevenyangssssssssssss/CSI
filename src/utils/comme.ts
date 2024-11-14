// tou icon
import { initials } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';

export const initAvatar = (uname: string) => {
  /** Name icon from dicebear */
  // return createAvatar(initials, { seed: uname, backgroundColor: ['b6e3f4','c0aede','d1d4f9'] }).toDataUriSync()
  return createAvatar(initials, {
    seed: uname,
    radius: 10,
  }).toDataUri();
};
