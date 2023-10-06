function Navbar() {
    return (
        <>
            <div className={'flex flex-wrap justify-center'}>
                <div className={'flex flex-wrap gap-x-1'}>
                    <div>Item 1</div>
                    <div>Item 2</div>
                    <div>Item 3</div>
                </div>
                <div className={'text-red-600 font-bold mx-5'}>
                    Logo
                </div>
                <div className={'flex flex-wrap gap-x-1'}>
                    <div>Item 4</div>
                    <div>Item 5</div>
                    <div>Item 6</div>
                </div>
            </div>
        </>
    );

}

export default Navbar;
