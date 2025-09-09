import { _mock } from 'src/_mock';
import { useMemo } from 'react';

// TO GET THE USER FROM THE AUTHCONTEXT, YOU CAN USE

// CHANGE:
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// const { user } = useMockedUser();

// TO:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedUser() {
  // 使用 useMemo 來確保 user 物件的引用穩定
  // 只有在依賴項陣列 (這裡是空的 []) 改變時，才會重新建立物件
  // 因為依賴項是空的，所以它只會在元件第一次渲染時建立一次
  const user = useMemo(
    () => ({
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1', // 6aff56bf-cc57-46d9-9908-4c87fec29aee
      displayName: 'Jaydon Frankie',
      email: 'demo@minimals.cc',
      photoURL: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-25.webp',// /assets/images/avatar/avatar_25.jpg
      phoneNumber: '+1-212-456-7890',
      country: 'United States',
      address: '90210 Broadway, New York, NY 10002, USA',
      state: 'New York',
      city: 'New York',
      zipCode: '10002',
      about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
      role: 'admin',
      isPublic: true,
    }),
    [] // 空依賴陣列是關鍵！
  );

  return { user };
}
