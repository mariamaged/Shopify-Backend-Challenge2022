import models from '../models';

async function add(images) {
  const t = await models.sequelize.transaction();
  try {
    let result = await models.Image.bulkCreate(
      images,
      { transaction: t },
    );
    await t.commit();
    result = result.map((image) => {
      const { dataValues: { id, userId, ...others } } = image;
      return others;
    })
    return result;
  } catch (error) {
    t.rollback();
    throw error;
  }
}

async function deleteAll(userId) {
  try {
    const t = await models.sequelize.transaction();
    try {
      const deletedRows = await models.Image.destroy(
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
  const t = await models.sequelize.transaction();
  try {
    const deletedRows = await models.Image.destroy(
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

async function getAll(props) {
  try {
    const result = await models.Image.findAll(
      {
        where: props,
        attributes: { exclude: ['id', 'userId'] },
      },
    );
    return result;
  } catch (error) {
    throw error;
  }
}

export default {
  add,
  deleteAll,
  deleteById,
  getAll,
};
