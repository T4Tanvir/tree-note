import { FILE_CONTENTS } from "@/constants/dummy/content";

const getContentById = (id: string) => {
  const data = FILE_CONTENTS.find((item) => item.id === id);

  return data;
};

export {
    getContentById,
}
