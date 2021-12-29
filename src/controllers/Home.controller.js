import User from "../models/User.model.js";

const Home = async (req, res) => {
    if (req.query.page === undefined) req.query.page = 1
    let limit = 10
    let offset = 0 + (req.query.page - 1) * limit

    const result = await User.findAndCountAll({
        limit: limit,
        offset: offset,
    });

    console.log(req.query.page)

    let pagination = "";

    const totalPage = Math.ceil(result.count / limit);

    const IsPreviousDisabled = (parseInt(req.query.page) <= 1) ? "disabled" : "";
    const currentPage = parseInt(req.query.page);

    pagination += ` <li class="page-item ${IsPreviousDisabled}">
                    <a class="page-link" href="/home?page=${(currentPage - 1)}" tabindex="-1" aria-disabled="${IsPreviousDisabled == "disabled" ? 'true' : ''}" >Previous</a>
                    </li>`;

    for (let i = 1; i <= totalPage; i++) {

        pagination += ` <li class="page-item ${currentPage == i ? "active" : ""}" aria-current="page">
                            <a class="page-link" href="/home?page=${i}">${i}</a>
                        </li>`
    }

    const nextActive = currentPage == totalPage ? "disabled" : "";
    pagination += ` <li class="page-item ${nextActive}">
                    <a class="page-link" href="/home?page=${currentPage + 1}" aria-disabled="true">Next</a>
                </li>`


    res.render('home', { title: 'Home', user: req.session.user, usersData: result, req: req, pagination: pagination })
}
export default Home;