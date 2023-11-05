<div class="alerts">

    @if(session('success'))
    <div class="alert-box alert-box--linked alert-box--success">
        <article>
            <p>
                {{ session('success') }}
            </p>
        </article>
    </div>
    @endif
    @if(session('error'))
        <div class="alert-box alert-box--linked alert-box--danger">
            <article>
                <p>
                    {{ session('error') }}
                </p>
            </article>
        </div>
    @endif

    @yield('alerts')

</div>

