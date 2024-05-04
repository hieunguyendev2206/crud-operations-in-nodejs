import Subject from "../model/subjectModel.js";

export const create = async (req, res) => {
    try {

        const subjectData = new Subject(req.body);

        if (!subjectData) {
            return res.status(404).json({msg: "Không tìm thấy dữ liệu môn học !"});
        }

        await subjectData.save();
        res.status(200).json({msg: "Thêm môn học thành công!"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const getAll = async (req, res) => {
    try {

        const subjectData = await Subject.find();
        if (!subjectData) {
            return res.status(404).json({msg: "Không tìm thấy dữ liệu môn học !"});
        }
        res.status(200).json(subjectData);

    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const getOne = async (req, res) => {
    try {

        const id = req.params.id;
        const subjectExist = await Subject.findById(id);
        if (!subjectExist) {
            return res.status(404).json({msg: "Không tìm thấy dữ liệu môn học!"});
        }
        res.status(200).json(subjectExist);

    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const update = async (req, res) => {
    try {

        const id = req.params.id;
        const subjectExist = await Subject.findById(id);
        if (!subjectExist) {
            return res.status(401).json({msg: "Không tìm thấy dữ liệu môn học!"});
        }

        const updatedData = await Subject.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({msg: "Cập nhật dữ liệu môn học thành công"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const deleteSubject = async (req, res) => {
    try {

        const id = req.params.id;
        const userExist = await Subject.findById(id);
        if (!userExist) {
            return res.status(404).json({msg: "Môn học không tồn tại"});
        }
        await Subject.findByIdAndDelete(id);
        res.status(200).json({msg: "Xóa môn học thành công!"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}