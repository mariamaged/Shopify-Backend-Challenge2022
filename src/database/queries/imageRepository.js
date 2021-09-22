import models from '../models';

async function add(images) {
  const t = await models.db.sequelize.transaction();
  try {
    const result = await models.db.Image.bulkCreate(
      images,
      { transaction: t },
    );
    await t.commit();
    return result;
  } catch (error) {
    t.rollback();
    throw error;
  }
}

async function deleteAll(userId) {
  try {
    const t = await models.db.sequelize.transaction();
    try {
      const deletedRows = await models.db.Image.destroy(
        {
          where: { userId },
          transaction: t,
        },
      );
      await t.commit();
      return deletedRows;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

async function deleteById(imageId) {
  const t = await models.db.sequelize.transaction();
  try {
    const deletedRows = await models.db.Image.destroy(
      {
        where: { id: imageId },
        transaction: t,
      },
    );
    await t.commit();
    return deletedRows;
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

async function getById(imageId) {
  try {
    const image = await models.db.Image.findOne(
      {
        where: { id: imageId },
      },
    );
    return image;
  } catch (error) {
    throw error;
  }
}

async function getAll(props) {
  try {
    const images = await models.db.Image.findAll(
      {
        where: { ...props },
      },
    );
    return images;
  } catch (error) {
    throw error;
  }
}

export default {
  add,
  deleteAll,
  deleteById,
  getById,
  getAll,
};
