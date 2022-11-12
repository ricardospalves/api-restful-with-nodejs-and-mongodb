const router = require("express").Router();
const Person = require("../models/Person");

// Create - criação de dados
router.post("/", async (req, res) => {
  const { name, salary, approved } = req.body;
  const person = {
    name,
    salary,
    approved,
  };

  if (!name) {
    res.status(422).json('O campo "name" é obrigatório.');
    return;
  }

  try {
    await Person.create(person);

    res
      .status(201)
      .json({ message: "Pessoa inserida no sistema com sucesso!" });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

// Read - leitura de dados
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const person = await Person.findOne({
      _id: id,
    });

    if (!person) {
      res.status(422).json({
        message: `Nenhum usuário com o ID ${id} foi encontrado.`,
      });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

// Update - atualização de dados
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, salary, approved } = req.body;
  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({
        message: `Nenhum usuário com o ID ${id} foi encontrado.`,
      });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

// Delete - deletar dados
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const person = await Person.findOne({
    _id: id,
  });

  if (!person) {
    res.status(422).json({
      message: `Nenhum usuário com o ID ${id} foi encontrado.`,
    });
    return;
  }

  try {
    await Person.deleteOne({
      _id: id,
    });

    res.status(200).json({
      message: "Usuário removido com sucesso!",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

module.exports = router;
